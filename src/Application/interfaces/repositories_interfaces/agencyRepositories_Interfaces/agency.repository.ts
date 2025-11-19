import { Agency } from "../../../../Domain/Entities/Agency/Agency";
import { AgencyKYC } from "../../../../Domain/Entities/Agency/AgencyKYC";
import type { IBaseRepository } from "../base.repository";

export interface PaginatedData {
  data: Agency[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AgencyWithKYCDTO {
  agency: Agency;
  kyc: AgencyKYC | null;
}


export interface IAgencyRepository extends IBaseRepository<Agency> {
  getAgencies(): Promise<Agency[]>;

  getPaginatedAgencies(page: number, limit: number, search: string, sortBy: string, sortOrder: "asc" | "desc"): Promise<PaginatedData>;

  findAgencyWithKYC(id: string): Promise<AgencyWithKYCDTO | null>;
}
