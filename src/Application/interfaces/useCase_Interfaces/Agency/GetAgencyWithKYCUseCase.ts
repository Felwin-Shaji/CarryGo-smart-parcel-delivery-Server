import { AgencyWithKYCResponseDTO } from "../../../Dto/Agency/agency.dto";

export interface IGetAgencyWithKYCUseCase {
    execute(agencyId: string): Promise<AgencyWithKYCResponseDTO>;
}
