import { RouteSegment } from "../../../../Domain/Entities/Logistics/RouteSegment";
import { IBaseRepository } from "../base.repository";
import { ClientSession } from "mongoose";

export interface IAgencyRouteSegmentRepository extends IBaseRepository<RouteSegment> {

    /**
     * Get the highest segmentOrder in a route group
     * Used to auto-assign next order on create
     */
    getMaxOrder(routeGroupId: string, session?: ClientSession): Promise<number>;

    findByIds(ids: string[], session?: ClientSession): Promise<RouteSegment[]>;
}