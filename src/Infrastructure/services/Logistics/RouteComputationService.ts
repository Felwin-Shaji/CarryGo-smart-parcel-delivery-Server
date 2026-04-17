import { IAgencyRouteSegmentRepository } from "../../../Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IAgencyRouteSegmentRepository";
import { IRouteComputationService } from "../../../Application/interfaces/services_Interfaces/IRouteComputationService";
import { RouteSegment } from "../../../Domain/Entities/Logistics/RouteSegment";
import { inject, injectable } from "tsyringe";

@injectable()
export class RouteComputationService implements IRouteComputationService {
    constructor(
        @inject("IAgencyRouteSegmentRepository") private _routeSegmentRepository: IAgencyRouteSegmentRepository,
    ) { }

    async computeSegmentChain(fromHubId: string, toHubId: string, agencyId: string): Promise<RouteSegment[]> {
        if (fromHubId === toHubId) {

            return [];
        }

        // ── Step 1: Load all active segments for this agency ───────
        // One DB call. BFS runs entirely in memory after this.
        const allSegments = await this._routeSegmentRepository.find({ agencyId: agencyId });

        if (allSegments.length === 0) return [];

        // ── Step 2: Build adjacency map ────────────────────────────
        // Map: originHubId → list of segments leaving that hub
        //
        // Example:
        //   "hub_mumbai" → [seg1 (Mumbai→Nagpur)]
        //   "hub_nagpur" → [seg2 (Nagpur→Delhi)]
        //   "hub_delhi"  → [seg3 (Delhi→Chandigarh), seg4 (Delhi→Lucknow)]
        const graph = new Map<string, RouteSegment[]>();

        for (const segment of allSegments) {
            if (!graph.has(segment.originHubId)) {
                graph.set(segment.originHubId, []);
            }

            graph.get(segment.originHubId)?.push(segment);
        }

        const queue: {
            hubId: string;
            path: RouteSegment[];
        }[] = [
                { hubId: fromHubId, path: [] }
            ];

        const visited = new Set<string>();

        while (queue.length > 0) {
            const { hubId, path } = queue.shift()!;

            if (hubId === toHubId) {
                return path;
            }

            if (visited.has(hubId)) {
                continue
            };
            visited.add(hubId);

            const nextSegments = graph.get(hubId) || [];

            for (const segment of nextSegments) {
                queue.push({
                    hubId: segment.destinationHubId,
                    path: [...path, segment]
                })
            }
        }

        return [];
    }
} 