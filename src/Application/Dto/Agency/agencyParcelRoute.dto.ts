import { ParcelRoute } from "@/Domain/Entities/Logistics/ParcelRoute";
import { ParcelRouteLeg } from "@/Domain/Entities/Logistics/ParcelRouteLeg";


export interface CreateParcelRouteResponseDTO {
    parcelRoute: ParcelRoute;
    legs: ParcelRouteLeg[];
}