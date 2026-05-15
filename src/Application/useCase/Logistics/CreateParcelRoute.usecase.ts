import { CreateParcelRouteResponseDTO } from "../../../Application/Dto/Agency/agencyParcelRoute.dto";
import { IParcelRouteLegRepository } from "../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelRouteLegRepository";
import { IParcelRouteRepository } from "../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelRouteRepository";
import { IBookingRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { IRouteComputationService } from "../../interfaces/services_Interfaces/IRouteComputationService";
import { ICreateParcelRouteUsecase } from "../../interfaces/useCase_Interfaces/Logistics/ParcelRoute/ICreateParcelRouteUsecase";
import { ParcelRouteLegMapper } from "../../Mappers/Logistics/ParcelRouteLegMapper.dto";
import { ParcelRouteMapper } from "../../Mappers/Logistics/ParcelRouteMapper.dto";
import { ParcelRoute } from "../../../Domain/Entities/Logistics/ParcelRoute";
import { ParcelRouteLeg } from "../../..//Domain/Entities/Logistics/ParcelRouteLeg";
import { AppError } from "../../../Domain/utils/customError";
import { BOOKING_MESSAGE } from "../../../Infrastructure/constants/messages/bookingMessages";
import { PARCEL_ROUTE_MESSAGE } from "../../../Infrastructure/constants/messages/RouteGroupMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
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