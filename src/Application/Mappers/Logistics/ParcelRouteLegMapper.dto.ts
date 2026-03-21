import { ParcelRouteLeg } from "@/Domain/Entities/Logistics/ParcelRouteLeg";
import { RouteSegment } from "@/Domain/Entities/Logistics/RouteSegment";

export class ParcelRouteLegMapper {
    static toCreateNewLegs(parcelRouteId: string, chain: RouteSegment[]): ParcelRouteLeg[] {
        return chain.map((segment, index) =>
            new ParcelRouteLeg(
                null,
                parcelRouteId,
                segment.id!,
                index + 1,
                "PENDING",
                null,
                new Date(),
                new Date()
            )
        )
    }
}