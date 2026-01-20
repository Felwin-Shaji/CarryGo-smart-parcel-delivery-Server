import { Hub } from "../../../../Domain/Entities/Hub/Hub";
import { GetHubsDTO, updateHubKycStatusDTO } from "../../../Dto/Hub/hub.dto";
import { ServiceableHubWithAgencyDTO } from "../../../Dto/User/Booking.dto";
import { IBaseRepository } from "../base.repository";
export interface PaginatedHubData {
  data: Hub[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IHubRepository extends IBaseRepository<Hub> {
    getHubById(hubId:string):Promise<Hub>;
    updateKycSatus(hubId: string, dto: updateHubKycStatusDTO):Promise<void>;
    getPaginatedHubsByAgency(agencyId: string,dto: GetHubsDTO):Promise<PaginatedHubData>;
    findServiceableAgenciesWithHubs(fromPincode: string, toPincode: string):Promise<ServiceableHubWithAgencyDTO[]>;
}