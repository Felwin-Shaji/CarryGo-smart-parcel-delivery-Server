import { IAgencyRouteSegmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IAgencyRouteSegmentRepository";
import { IHubShipmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IParcelMovementRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelMovementRepository";
import { IParcelRouteLegRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelRouteLegRepository";
import { IShipmentParcelRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { IHubShipmentAssignmentService } from "@/Application/interfaces/services_Interfaces/IHubShipmentAssignmentService";
import { HubShipmentMapper } from "@/Application/Mappers/Logistics/HubShipmentMapper";
import { ParcelMovementMapper } from "@/Application/Mappers/Logistics/ParcelMovementMapper";
import { ShipmentParcelMapper } from "@/Application/Mappers/Logistics/ShipmentParcelMapper";
import { ParcelRouteLeg } from "@/Domain/Entities/Logistics/ParcelRouteLeg";
import { AppError } from "@/Domain/utils/customError";
import { ROUTE_SEGMENT_MESSAGE } from "@/Infrastructure/constants/messages/RouteGroupMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { ClientSession } from "mongoose";
import { inject, injectable } from "tsyringe";

@injectable()
export class HubShipmentAssignmentService implements IHubShipmentAssignmentService {
    constructor(
        @inject("IHubShipmentRepository") private _hubShipmentRepository: IHubShipmentRepository,

        @inject("IAgencyRouteSegmentRepository") private _routeSegmentRepository: IAgencyRouteSegmentRepository,

        @inject("IParcelRouteLegRepository") private _parcelRouteLegRepository: IParcelRouteLegRepository,

        @inject("IParcelMovementRepository") private _parcelMovementRepository: IParcelMovementRepository,

        @inject("IShipmentParcelRepository") private _shipmentParcelRepository: IShipmentParcelRepository,
    ) { };

    async assignLegToShipment(leg: ParcelRouteLeg, bookingId: string, session: ClientSession): Promise<void> {

        const segment = await this._routeSegmentRepository.findById(
            { _id: leg.segmentId },
            session
        );
        if (!segment) throw new AppError(ROUTE_SEGMENT_MESSAGE.ID_NOTFOUND, STATUS.NOT_FOUND);

        let shipment = await this._hubShipmentRepository.findOpenShipmentForSegment(
            leg.segmentId,
            session
        )

        if (shipment) {
            await this._hubShipmentRepository.findOneAndUpdate(
                { _id: shipment.id },
                { parcelCount: shipment.parcelCount + 1 },
                undefined,
                session
            );
        } else {

            shipment = await this._hubShipmentRepository.save(
                HubShipmentMapper.toCreate(segment),
                session
            );

        }

        await this._parcelRouteLegRepository.updateShipmentId(leg.id!, shipment.id!, session);

        await this._shipmentParcelRepository.save(
            ShipmentParcelMapper.toCreate(shipment.id!, bookingId),
            session
        )

        await this._parcelMovementRepository.save(
            ParcelMovementMapper.toPending(bookingId, shipment, segment),
            session
        )


    }
}