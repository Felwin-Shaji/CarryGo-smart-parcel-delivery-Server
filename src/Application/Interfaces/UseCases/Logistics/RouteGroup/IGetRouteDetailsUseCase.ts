import { RouteGroupDetailDTO } from "../../../../DTOs/Agency/AgencyRouteSegmentDTO";

export interface IGetRouteGroupDetailUseCase {
    execute(routeGroupId: string, agencyId: string): Promise<RouteGroupDetailDTO>;
};