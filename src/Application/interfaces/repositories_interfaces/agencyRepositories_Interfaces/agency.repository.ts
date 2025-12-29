import { Agency } from "../../../../Domain/Entities/Agency/Agency";
import { AgencyKYC } from "../../../../Domain/Entities/Agency/AgencyKYC";
import { GetAgenciesDTO } from "../../../Dto/Agency/agency.dto";
import type { IBaseRepository } from "../base.repository";

export interface PaginatedData {
  data: Agency[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AgencyWithKYC_DB_Result extends  Agency {
  kyc: AgencyKYC | null;
}


export interface IAgencyRepository extends IBaseRepository<Agency> {
  getAgencies(): Promise<Agency[]>;

  getPaginatedAgencies(dto: GetAgenciesDTO): Promise<PaginatedData>;

  findAgencyWithKYC(id: string): Promise<AgencyWithKYC_DB_Result  | null>;
}
