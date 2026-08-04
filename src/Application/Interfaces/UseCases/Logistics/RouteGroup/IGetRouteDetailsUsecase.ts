import { RouteGroupDetailDTO } from "../../../../DTOs/Agency/agencyRouteSegment.dto";

export interface IGetRouteGroupDetailUseCase {
    execute(routeGroupId: string, agencyId: string): Promise<RouteGroupDetailDTO>;
};