
import { RegisterAgencyDTO, RegisterAgencyResponseDTO } from "../../../DTOs/Agency/agency.dto.js";

export interface IRegisterAgencyUseCase {
    execute(agencyData:RegisterAgencyDTO): Promise<RegisterAgencyResponseDTO>;
}