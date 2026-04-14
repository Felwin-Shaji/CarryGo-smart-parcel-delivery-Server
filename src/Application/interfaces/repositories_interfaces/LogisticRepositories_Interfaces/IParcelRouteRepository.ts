import { ClientSession } from "mongoose";
import { ParcelRoute } from "../../../../Domain/Entities/Logistics/ParcelRoute";
import { ParcelRouteLeg } from "../../../../Domain/Entities/Logistics/ParcelRouteLeg";

export interface IParcelRouteRepository {

    save(parcelRoute: ParcelRoute, session?: ClientSession): Promise<ParcelRoute>;

    findByBookingId(bookingId: string, session?: ClientSession): Promise<ParcelRoute | null>;

    findById(id: string, session?: ClientSession): Promise<ParcelRoute>;

    update(parcelRoute: ParcelRoute, session?: ClientSession): Promise<void>;
}