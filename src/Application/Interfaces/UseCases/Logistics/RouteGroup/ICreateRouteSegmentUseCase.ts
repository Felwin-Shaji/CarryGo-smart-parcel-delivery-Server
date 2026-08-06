import { CreateRouteSegmentDTO } from "../../../../DTOs/Agency/AgencyRouteSegmentDTO";

export interface ICreateRouteSegmentUseCase {
    execute(routeGroupId: string, agencyId: string, data: CreateRouteSegmentDTO): Promise<void>
}