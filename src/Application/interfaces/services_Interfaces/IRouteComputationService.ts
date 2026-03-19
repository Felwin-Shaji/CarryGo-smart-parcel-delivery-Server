
import { RouteSegment } from "../../../Domain/Entities/Logistics/RouteSegment";

/**
 * IRouteComputationService
 *
 * Responsible for finding a valid segment chain between
 * two hubs within a specific agency's route network.
 */
export interface IRouteComputationService {

    /**
     * Finds the ordered chain of RouteSegments connecting
     * fromHubId to toHubId within a given agency's network.
     *
     * Uses BFS (Breadth First Search) to walk the hub graph.
     *
     * Returns:
     *   - ordered array of RouteSegments if a path exists
     *   - empty array if no path found
     *
     * Example:
     *   fromHubId: "hub_mumbai"
     *   toHubId:   "hub_delhi"
     *   agencyId:  "agency_A"
     *
     *   returns: [
     *     RouteSegment { origin: Mumbai, dest: Nagpur, order: 1 },
     *     RouteSegment { origin: Nagpur, dest: Delhi,  order: 2 }
     *   ]
     */
    computeSegmentChain(
        fromHubId: string,
        toHubId: string,
        agencyId: string
    ): Promise<RouteSegment[]>;

}