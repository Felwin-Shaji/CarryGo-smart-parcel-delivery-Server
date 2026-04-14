import { ShipmentStatus } from "@/Domain/Entities/Logistics/HubShipment";
import { ShipmentParcel, ShipmentParcelStatus } from "@/Domain/Entities/Logistics/ShipmentParcel";

export class ShipmentParcelMapper {

    static toCreate(shipmentId: string, bookingId: string): ShipmentParcel {
        return new ShipmentParcel(
            null,
            shipmentId,
            bookingId,
            "PENDING",
            new Date(),
            null,
            new Date(),
            new Date(),
        );
    }

     static updateFromShipmentStatus(
        parcel: ShipmentParcel,
        shipmentStatus: ShipmentStatus,
        now: Date
    ): ShipmentParcel {

        const statusMap: Record<ShipmentStatus, ShipmentParcelStatus | null> = {
            PENDING: "PENDING",
            LOADING: "LOADED",
            DISPATCHED: "IN_TRANSIT",
            ARRIVED: "UNLOADED",
            COMPLETED: "UNLOADED",
            CANCELLED: null,
        };

        const newStatus = statusMap[shipmentStatus];

        if (!newStatus) return parcel;

        parcel.status = newStatus;

        if (newStatus === "IN_TRANSIT") {
            parcel.loadedAt = now;
        }

        if (newStatus === "UNLOADED") {
            parcel.unloadedAt = now;
        }

        parcel.updatedAt = now;

        return parcel;
    }
}