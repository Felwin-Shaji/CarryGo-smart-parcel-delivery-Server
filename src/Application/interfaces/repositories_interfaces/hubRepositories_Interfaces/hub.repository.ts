import { Hub } from "../../../../Domain/Entities/Hub/Hub";
import { GetHubsDTO } from "../../../Dto/Hub/hub.dto";
import { IBaseRepository } from "../base.repository";
export interface PaginatedHubData {
  data: Hub[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IHubRepository extends IBaseRepository<Hub> {
    getPaginatedHubsByAgency(agencyId: string,dto: GetHubsDTO):Promise<PaginatedHubData>
}