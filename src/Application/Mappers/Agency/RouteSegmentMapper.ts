import { RouteGroup } from "../../../Domain/Entities/Logistics/RouteGroup";
import { RouteSegment } from "../../../Domain/Entities/Logistics/RouteSegment";
import { AppError } from "../../../Domain/utils/customError";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";
import { ROUTE_SEGMENT_MESSAGE } from "../../../Infrastructure/constants/messages/RouteGroupMessage";
import { CreateRouteSegmentDTO, RouteGroupDetailDTO, RouteSegmentDTO } from "../../Dto/Agency/agencyRouteSegment.dto";


export class RouteSegmentMapper {

    static toCreate(agencyId: string, routeGroupId: string, maxOrder: number, data: CreateRouteSegmentDTO,): RouteSegment {
        return new RouteSegment(
            null,
            agencyId,
            routeGroupId,
            data.originHubId,
            data.destinationHubId,
            maxOrder + 1,
            data.estimatedTimeMinutes ?? null,
            data.distanceKm ?? null,
            data.isActive ?? true,
        );
    }

    static toSegmentDTOs(
        segments: RouteSegment[],
        hubMap: Map<string | null, {
            name: string;
            location: {
                lat: number;
                lng: number;
            };
        }>
    ): RouteSegmentDTO[] {
        return segments
            .sort((a, b) => a.segmentOrder - b.segmentOrder)
            .map(s => {
                if (!s.id) throw new AppError(ROUTE_SEGMENT_MESSAGE.ID_NOTFOUND);

                const originHub = hubMap.get(s.originHubId);
                const destinationHub = hubMap.get(s.destinationHubId);

                if (!originHub || !destinationHub) {
                    throw new AppError(HUB_MESSAGES.LOCATTION_NOT_FOUND);
                }

                return {
                    id: s.id,
                    routeGroupId: s.routeGroupId,
                    originHubId: s.originHubId,
                    originHubName: originHub.name ?? "Unknown Hub",
                    destinationHubId: s.destinationHubId,
                    destinationHubName: destinationHub.name ?? "Unknown Hub",
                    segmentOrder: s.segmentOrder,
                    estimatedTimeMinutes: s.estimatedTimeMinutes,
                    distanceKm: s.distanceKm,
                    isActive: s.isActive,
                    createdAt: s.createdAt.toISOString(),
                    updatedAt: s.updatedAt.toISOString(),
                    originHubLocation: originHub.location,
                    destinationHubLocation: destinationHub.location
                };
            });
    }

    static toRouteGroupDetailDTO(
        routeGroup: RouteGroup,
        segmentDTOs: RouteSegmentDTO[],
        totalDistanceKm: number,
        totalEstimatedMinutes: number,
        activeSegmentCount: number
    ): RouteGroupDetailDTO {
        return {
            id: routeGroup.id!,
            agencyId: routeGroup.agencyId,
            name: routeGroup.name,
            description: routeGroup.description,
            isActive: routeGroup.isActive,
            createdAt: routeGroup.createdAt.toISOString(),
            updatedAt: routeGroup.updatedAt.toISOString(),
            segments: segmentDTOs,
            totalDistanceKm,
            totalEstimatedMinutes,
            activeSegmentCount,
        };
    }
}