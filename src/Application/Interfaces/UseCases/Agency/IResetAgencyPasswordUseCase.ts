import { AgencyResetPasswordRequestDTO } from "../../../DTOs/Agency/AgencyProfileDTO";

export interface IResetAgencyPasswordUseCase {
    execute(agencyId: string, dto: AgencyResetPasswordRequestDTO): Promise<void>;
}