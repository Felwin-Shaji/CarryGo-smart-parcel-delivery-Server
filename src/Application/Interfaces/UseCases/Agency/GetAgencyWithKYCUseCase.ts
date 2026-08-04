import { AgencyWithKYCResponseDTO } from "../../../DTOs/Agency/agency.dto";

export interface IGetAgencyWithKYCUseCase {
    execute(agencyId: string): Promise<AgencyWithKYCResponseDTO>;
}
