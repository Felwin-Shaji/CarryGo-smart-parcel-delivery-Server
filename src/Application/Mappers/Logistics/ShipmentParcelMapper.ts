import { ShipmentParcel } from "@/Domain/Entities/Logistics/ShipmentParcel";

export class ShipmentParcelMapper {

    static toCreate(shipmentId: string, bookingId: string): ShipmentParcel {
        return new ShipmentParcel(
            null,
            shipmentId,
            bookingId,
            "LOADED",
            new Date(),
            null,
            new Date(),
            new Date(),
        );
    }
}