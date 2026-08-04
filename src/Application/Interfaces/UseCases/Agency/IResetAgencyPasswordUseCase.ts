import { AgencyResetPasswordRequestDTO } from "../../../DTOs/Agency/agencyProfile.dto";

export interface IResetAgencyPasswordUseCase {
    execute(agencyId: string, dto: AgencyResetPasswordRequestDTO): Promise<void>;
}