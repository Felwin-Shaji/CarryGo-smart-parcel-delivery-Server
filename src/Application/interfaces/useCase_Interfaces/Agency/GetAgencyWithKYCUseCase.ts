import { AgencyWithKYCDTO } from "../../repositories_interfaces/agencyRepositories_Interfaces/agency.repository";

export interface IGetAgencyWithKYCUseCase {
    execute(id: string): Promise<AgencyWithKYCDTO>;
}
