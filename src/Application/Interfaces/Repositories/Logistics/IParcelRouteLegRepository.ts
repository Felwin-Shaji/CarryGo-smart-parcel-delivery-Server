import { ClientSession } from "mongoose";
import { ParcelRouteLeg } from "../../../../Domain/Entities/Logistics/ParcelRouteLeg";

export interface IParcelRouteLegRepository {

    saveMany(legs: ParcelRouteLeg[], session?: ClientSession): Promise<ParcelRouteLeg[]>;

    findByRouteId(parcelRouteId: string, session?: ClientSession): Promise<ParcelRouteLeg[]>;

    updateShipmentId(legId: string, shipmentId: string, session?: ClientSession): Promise<void>;

    update(leg: ParcelRouteLeg, session?: ClientSession): Promise<void>;
}