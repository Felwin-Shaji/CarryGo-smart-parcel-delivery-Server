import type { Agency } from "../../../../Domain/Entities/Agency.js";
import type { AgencyDTO } from "../../../Dto/Auth/Auth.dto.js";

export interface IRegisterAgencyUseCase {
    execute(agencyData:AgencyDTO): Promise<Agency>;
}