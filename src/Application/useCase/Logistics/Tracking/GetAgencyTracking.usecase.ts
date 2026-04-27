import { AgencyParcelTrackingDTO } from "@/Application/Dto/Logistics/ParcelTracking.dto";
import { IHubRepository } from "@/Application/interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { IAgencyRouteSegmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IAgencyRouteSegmentRepository";
import { IHubShipmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IParcelMovementRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelMovementRepository";
import { IParcelRouteLegRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelRouteLegRepository";
import { IParcelRouteRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelRouteRepository";
import { IBookingRepository } from "@/Application/interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { IGetAgencyTrackingUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/Tracking/IGetAgencyTrackingUsecase";
import { AgencyParcelTrackingMapper } from "@/Application/Mappers/Logistics/AgencyParcelTrackingMapper";
import { AppError } from "@/Domain/utils/customError";
import { BOOKING_MESSAGE } from "@/Infrastructure/constants/messages/bookingMessages";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { Role } from "@/Infrastructure/Types/types";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAgencyTrackingUsecase implements IGetAgencyTrackingUsecase {
    constructor(
        @inject("IBookingRepository") private _bookingRepository: IBookingRepository,
        @inject("IParcelRouteRepository") private _parcelRouteRepository: IParcelRouteRepository,
        @inject("IParcelRouteLegRepository") private _parcelRouteLegRepository: IParcelRouteLegRepository,
        @inject("IParcelMovementRepository") private _parcelMovementRepository: IParcelMovementRepository,
        @inject("IAgencyRouteSegmentRepository") private _agencyRouteSegmentRepository: IAgencyRouteSegmentRepository,
        @inject("IHubRepository") private _hubRepository: IHubRepository,
        @inject("IHubShipmentRepository") private _hubShipmentRepository: IHubShipmentRepository,
    ) { }
    async execute(bookingId: string, role: Role, userId: string): Promise<AgencyParcelTrackingDTO> {

        console.log(role,userId); // need to impliment validateion

        const booking = await this._bookingRepository.getBookingByBookingId(bookingId);
        if (!booking) throw new AppError(BOOKING_MESSAGE.NOT_FOUND, STATUS.NOT_FOUND);

        const route = await this._parcelRouteRepository.findByBookingId(booking.id!);
        const legs = route
            ? await this._parcelRouteLegRepository.findByRouteId(route.id!)
            : [];

        const movements = await this._parcelMovementRepository.findByBookingId(booking.id!);
        movements.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

        const segmentIds = legs.map(l => l.segmentId);

        const segments = await this._agencyRouteSegmentRepository.findByIds(segmentIds);
        const segmentMap = new Map(
            segments.map(s => [s.id!, s])
        );

        const hubIds = new Set<string>();

        legs.forEach(l => {
            const segment = segmentMap.get(l.segmentId);

            if (segment) {
                hubIds.add(segment.originHubId);
                hubIds.add(segment.destinationHubId);
            }
        });

        const hubs = await this._hubRepository.findByIds([...hubIds]);
        const hubMap = new Map(hubs.map((h) => [h.id!, h]));

        const shipmentIds = legs.map((l) => l.shipmentId).filter(Boolean)
        const shipments = await this._hubShipmentRepository.findByIds(shipmentIds as string[]);

        const result = AgencyParcelTrackingMapper.toDTO(booking, legs, movements, segmentMap, hubMap, shipments);
        console.log("Tracking Result: ", result);
        return result;
    }
}