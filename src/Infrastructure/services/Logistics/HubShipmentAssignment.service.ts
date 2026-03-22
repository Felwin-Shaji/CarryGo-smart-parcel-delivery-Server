import { IAgencyRouteSegmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IAgencyRouteSegmentRepository";
import { IHubShipmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IParcelRouteLegRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IParcelRouteLegRepository";
import { IHubShipmentAssignmentService } from "@/Application/interfaces/services_Interfaces/IHubShipmentAssignmentService";
import { HubShipment } from "@/Domain/Entities/Logistics/HubShipment";
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
    ) { };

    async assignLegToShipment(leg: ParcelRouteLeg, session: ClientSession): Promise<void> {

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
                new HubShipment(
                    null,
                    leg.segmentId,
                    "HUB_TRANSFER",
                    segment.originHubId,
                    segment.destinationHubId,
                    null,
                    null,
                    null,
                    1,
                    "PENDING",
                    null,
                    null,
                    new Date(),
                    new Date(),
                ),
                session
            );

        }

        await this._parcelRouteLegRepository.updateShipmentId(leg.id!, shipment.id!, session);


    }
}