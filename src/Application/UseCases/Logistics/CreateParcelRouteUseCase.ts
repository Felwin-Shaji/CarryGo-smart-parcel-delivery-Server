import { CreateParcelRouteResponseDTO } from "../../DTOs/Agency/AgencyParcelRouteDTO";
import { IParcelRouteLegRepository } from "../../Interfaces/Repositories/Logistics/IParcelRouteLegRepository";
import { IParcelRouteRepository } from "../../Interfaces/Repositories/Logistics/IParcelRouteRepository";
import { IBookingRepository } from "../../Interfaces/Repositories/User/IBookingRepository";
import { IRouteComputationService } from "../../Interfaces/Services/IRouteComputationService";
import { ICreateParcelRouteUsecase } from "../../Interfaces/UseCases/Logistics/ParcelRoute/ICreateParcelRouteUseCase";
import { ParcelRouteLegMapper } from "../../Mappers/Logistics/ParcelRouteLegMapper";
import { ParcelRouteMapper } from "../../Mappers/Logistics/ParcelRouteMapper";
import { ParcelRoute } from "../../../Domain/Entities/Logistics/ParcelRoute";
import { ParcelRouteLeg } from "../../../Domain/Entities/Logistics/ParcelRouteLeg";
import { AppError } from "../../../Domain/Utils/customError";
import { BOOKING_MESSAGE } from "../../../Infrastructure/Constants/Messages/bookingMessages";
import { PARCEL_ROUTE_MESSAGE } from "../../../Infrastructure/Constants/Messages/routeGroupMessages";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import mongoose from "mongoose";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateParcelRouteUsecase implements ICreateParcelRouteUsecase {
    constructor(
        @inject("IBookingRepository") private _bookingRepository: IBookingRepository,
        @inject("IParcelRouteRepository") private _parcelRouteRepository: IParcelRouteRepository,
        @inject("IParcelRouteLegRepository") private _parcelRouteLegRepository: IParcelRouteLegRepository,
        @inject("IRouteComputationService") private _routeComputationService: IRouteComputationService,
    ) { }

    async execute(bookingId: string): Promise<CreateParcelRouteResponseDTO> {

        const existing = await this._parcelRouteRepository.findByBookingId(bookingId);
        if (existing) {
            const legs = await this._parcelRouteLegRepository.findByRouteId(existing.id!);
            return { parcelRoute: existing, legs };
        }

        const booking = await this._bookingRepository.getBookingById(bookingId);

        if (!booking.partnerSnapshot?.partnerId) {
            throw new AppError(BOOKING_MESSAGE.NO_AGENCY_ASSIGNED, STATUS.BAD_REQUEST);
        }

        const agencyId = booking.partnerSnapshot.partnerId;
        const fromHubId = booking.logistics?.fromHubId;
        const toHubId = booking.logistics?.toHubId;

        if (!fromHubId || !toHubId) {
            throw new AppError(BOOKING_MESSAGE.ROUTING_INFO_NOT_FOUND, STATUS.BAD_REQUEST);
        };

        const chain = await this._routeComputationService.computeSegmentChain(fromHubId, toHubId, agencyId); ////////////////

        if (!chain.length) {
            throw new AppError(BOOKING_MESSAGE.VALID_ROUTE_NOT_FOUND, STATUS.NOT_FOUND);
        }

        const session = await mongoose.startSession();

        let parcelRoute!: ParcelRoute;
        let legs!: ParcelRouteLeg[];

        try {

            await session.withTransaction(async () => {

                parcelRoute = await this._parcelRouteRepository.save(
                    ParcelRouteMapper.toCreate(bookingId),
                    session
                );

                if (!parcelRoute.id) {
                    throw new AppError(PARCEL_ROUTE_MESSAGE.NOTFOUND, STATUS.NOT_FOUND)
                };

                legs = await this._parcelRouteLegRepository.saveMany(
                    ParcelRouteLegMapper.toCreateNewLegs(parcelRoute.id, chain),
                    session
                );

                await this._bookingRepository.updateLogistics(
                    bookingId,
                    {
                        parcelRouteId: parcelRoute.id!,
                        lastUpdatedAt: new Date(),
                    },
                    session,
                );
            })
        } finally {
            await session.endSession();
        }

        return { parcelRoute, legs };
    }
}