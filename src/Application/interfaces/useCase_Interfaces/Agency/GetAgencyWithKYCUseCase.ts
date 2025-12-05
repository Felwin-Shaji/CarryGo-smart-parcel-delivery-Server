// import { AgencyWithKYCDTO } from "../../repositories_interfaces/agencyRepositories_Interfaces/agency.repository";

import { AgencyWithKYCResponseDTO } from "../../../Dto/Agency/agency.dto";

export interface IGetAgencyWithKYCUseCase {
    execute(agencyId: string): Promise<AgencyWithKYCResponseDTO>;
}
