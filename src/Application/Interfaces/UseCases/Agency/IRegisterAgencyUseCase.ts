
import { RegisterAgencyDTO, RegisterAgencyResponseDTO } from "../../../DTOs/Agency/AgencyDTO.js";

export interface IRegisterAgencyUseCase {
    execute(agencyData:RegisterAgencyDTO): Promise<RegisterAgencyResponseDTO>;
}