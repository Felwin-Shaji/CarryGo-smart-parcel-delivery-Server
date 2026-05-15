import { CreateRouteSegmentDTO } from "../../../../Dto/Agency/agencyRouteSegment.dto";

export interface ICreateRouteSegmentUseCase {
    execute(routeGroupId: string, agencyId: string, data: CreateRouteSegmentDTO): Promise<void>
}