import { RouteGroupDetailDTO } from "../../../../Dto/Agency/agencyRouteSegment.dto";

export interface IGetRouteGroupDetailUseCase {
    execute(routeGroupId: string, agencyId: string): Promise<RouteGroupDetailDTO>;
};