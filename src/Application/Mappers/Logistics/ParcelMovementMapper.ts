import { ParcelMovement } from "@/Domain/Entities/Booking/ParcelMovement";
import { HubShipment, ShipmentStatus } from "@/Domain/Entities/Logistics/HubShipment";
import { RouteSegment } from "@/Domain/Entities/Logistics/RouteSegment";
import { ShipmentParcelStatus } from "@/Domain/Entities/Logistics/ShipmentParcel";

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

    static toDelivery(
        bookingId: string,
        shipmentId: string,
        fromHubId: string
    ): ParcelMovement {
        return new ParcelMovement(
            null,
            bookingId,
            shipmentId,
            null,
            fromHubId,
            null,
            "PENDING",
            null,
            null,
            new Date(),
            new Date(),
        )
    }

    static getStatusFromShipment(
        status: ShipmentStatus
    ): ShipmentParcelStatus | null {
        const map: Record<ShipmentStatus, ShipmentParcelStatus | null> = {
            PENDING: null,
            LOADING: "LOADED",
            DISPATCHED: "IN_TRANSIT",
            ARRIVED: "UNLOADED",
            COMPLETED: "UNLOADED",
            CANCELLED: null,
        };

        return map[status];
    }
}