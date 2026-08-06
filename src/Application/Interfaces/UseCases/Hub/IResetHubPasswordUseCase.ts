import { HubResetPasswordRequestDTO } from "../../../DTOs/Hub/HubProfileDTO";

export interface IResetHubPasswordUseCase {
    execute(agencyId: string, dto: HubResetPasswordRequestDTO): Promise<void>;
}