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

    static toLoaded(
        bookingId: string,
        shipmentId: string,
        fromHubId: string | null,
        segmentId: string | null = null
    ): ParcelMovement {
        return new ParcelMovement(
            null,
            bookingId,
            shipmentId,
            segmentId,
            fromHubId,
            null,
            "LOADED",
            null,
            new Date(),
            new Date()
        );
    }

    static toTransit(
        bookingId: string,
        shipmentId: string,
        fromHubId: string | null,
        toHubId: string | null,
        segmentId: string | null = null
    ): ParcelMovement {
        return new ParcelMovement(
            null,
            bookingId,
            shipmentId,
            segmentId,
            fromHubId,
            toHubId,
            "IN_TRANSIT",
            // "Parcel is in transit",
            null,
            new Date(),
            new Date()
        );
    }

    static toArrived(
        bookingId: string,
        shipmentId: string,
        toHubId: string | null,
        segmentId: string | null = null
    ): ParcelMovement {
        return new ParcelMovement(
            null,
            bookingId,
            shipmentId,
            segmentId,
            null,
            toHubId,
            "ARRIVED",
            null,
            new Date(),
            new Date()
        );
    }

    static toDelivered(
        bookingId: string,
        shipmentId: string,
        toHubId: string | null
    ): ParcelMovement {
        return new ParcelMovement(
            null,
            bookingId,
            shipmentId,
            null,
            null,
            toHubId,
            "DELIVERED",
            null,
            new Date(),
            new Date()
        );
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