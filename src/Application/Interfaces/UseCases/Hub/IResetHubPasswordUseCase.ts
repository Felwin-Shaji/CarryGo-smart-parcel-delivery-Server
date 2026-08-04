import { HubResetPasswordRequestDTO } from "../../../DTOs/Hub/hubProfile.dto";

export interface IResetHubPasswordUseCase {
    execute(agencyId: string, dto: HubResetPasswordRequestDTO): Promise<void>;
}