import { ClientSession } from "mongoose";
import { ParcelRouteLeg } from "../../../../Domain/Entities/Logistics/ParcelRouteLeg";

export interface IParcelRouteLegRepository {

    saveMany(legs: ParcelRouteLeg[], session?: ClientSession): Promise<ParcelRouteLeg[]>;

    findByRouteId(parcelRouteId: string, session?: ClientSession): Promise<ParcelRouteLeg[]>;
}