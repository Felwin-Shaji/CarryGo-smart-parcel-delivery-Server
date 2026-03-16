import { ClientSession } from "mongoose";
import { RouteGroup } from "../../../../Domain/Entities/Agency/RouteGroup";
import { IBaseRepository } from "../base.repository";
import { RouteGroupPaginationRequestDTO } from "../../../Dto/Agency/agencyRouteGroup.dto";

export interface IAgencyRouteGroupRepository extends IBaseRepository<RouteGroup> {
  getRouteGroupsByAgency(agencyId: string, session?: ClientSession): Promise<RouteGroup[]>;
  getPaginated(
    agencyId: string,
    options: RouteGroupPaginationRequestDTO,
    session?: ClientSession
  ): Promise<{ data: RouteGroup[]; total: number }>;
};