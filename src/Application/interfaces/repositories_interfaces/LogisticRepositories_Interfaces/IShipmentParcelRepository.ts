import { ClientSession } from "mongoose";
import { ShipmentParcel } from "../../../../Domain/Entities/Logistics/ShipmentParcel";

export interface IShipmentParcelRepository {

    save(shipmentParcel: ShipmentParcel, session?: ClientSession): Promise<ShipmentParcel>;

    findByShipmentId(shipmentId: string, session?: ClientSession): Promise<ShipmentParcel[]>;

    findByBookingId(bookingId: string, session?: ClientSession): Promise<ShipmentParcel[]>;

    updateStatus(
        shipmentParcelId: string,
        status: string,
        session?: ClientSession
    ): Promise<void>;
}