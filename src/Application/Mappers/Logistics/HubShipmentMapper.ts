// Application/Mappers/Logistics/HubShipmentMapper.ts
import { HubShipment } from "@/Domain/Entities/Logistics/HubShipment";
import { RouteSegment } from "@/Domain/Entities/Logistics/RouteSegment";

export class HubShipmentMapper {

    static toCreate(segment: RouteSegment): HubShipment {
        return new HubShipment(
            null,
            segment.id,
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
        );
    }
}