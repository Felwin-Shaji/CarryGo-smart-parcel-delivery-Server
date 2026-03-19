import { ClientSession } from "mongoose";
import { ParcelRoute } from "../../../../Domain/Entities/Logistics/ParcelRoute";
import { ParcelRouteLeg } from "../../../../Domain/Entities/Logistics/ParcelRouteLeg";

export interface IParcelRouteRepository {

    save(parcelRoute: ParcelRoute, session?: ClientSession): Promise<ParcelRoute>;

    // /**
    //  * Bulk insert all legs for a route in one operation.
    //  */
    // saveLegs(legs: ParcelRouteLeg[], session?: ClientSession): Promise<void>;

    findByBookingId(bookingId: string, session?: ClientSession): Promise<ParcelRoute | null>;

    /**
     * Find all legs for a route, ordered by legOrder.
     */
    findLegsByRouteId(parcelRouteId: string, session?: ClientSession): Promise<ParcelRouteLeg[]>;
}