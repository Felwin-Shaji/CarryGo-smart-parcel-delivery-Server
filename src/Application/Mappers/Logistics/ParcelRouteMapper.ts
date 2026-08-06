import { ParcelRoute } from "../../../Domain/Entities/Logistics/ParcelRoute";

export class ParcelRouteMapper {
    static toCreate(bookingId: string): ParcelRoute {
        return new ParcelRoute(
            null,
            bookingId,
            "PLANNED",
            new Date(),
            new Date()
        )
    }
}