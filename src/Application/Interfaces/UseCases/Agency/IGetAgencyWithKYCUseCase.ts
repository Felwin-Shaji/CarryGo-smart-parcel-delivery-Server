import { AgencyWithKYCResponseDTO } from "../../../DTOs/Agency/AgencyDTO";

export interface IGetAgencyWithKYCUseCase {
    execute(agencyId: string): Promise<AgencyWithKYCResponseDTO>;
}
