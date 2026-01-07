import { AgencyResetPasswordRequestDTO } from "../../../Dto/Agency/agencyProfile.dto";

export interface IResetAgencyPasswordUseCase {
    execute(agencyId: string, dto: AgencyResetPasswordRequestDTO): Promise<void>;
}