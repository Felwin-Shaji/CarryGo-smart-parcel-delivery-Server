
import { RegisterAgencyDTO, RegisterAgencyResponseDTO } from "../../../Dto/Agency/agency.dto.js";

export interface IRegisterAgencyUseCase {
    execute(agencyData:RegisterAgencyDTO): Promise<RegisterAgencyResponseDTO>;
}