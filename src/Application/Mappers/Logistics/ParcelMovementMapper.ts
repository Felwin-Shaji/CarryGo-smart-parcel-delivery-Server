import { ParcelMovement } from "@/Domain/Entities/Booking/ParcelMovement";
import { HubShipment } from "@/Domain/Entities/Logistics/HubShipment";
import { RouteSegment } from "@/Domain/Entities/Logistics/RouteSegment";

export class ParcelMovementMapper {

    static toPending(
        bookingId: string,
        shipment: HubShipment,
        segment: RouteSegment,
    ): ParcelMovement {
        return new ParcelMovement(
            null,
            bookingId,
            shipment.id!,
            segment.id,
            segment.originHubId,
            segment.destinationHubId,
            "PENDING",
            null,
            null,
            new Date(),
            new Date(),
        );
    }

    static toPickup(
        bookingId: string,
        shipmentId: string,
        toHubId: string
    ): ParcelMovement {
        return new ParcelMovement(
            null,
            bookingId,
            shipmentId,
            null,
            null,
            toHubId,
            "PENDING",
            null,
            null,
            new Date(),
            new Date(),
        )
    }
}