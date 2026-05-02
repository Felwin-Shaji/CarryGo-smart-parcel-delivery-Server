import { HubResetPasswordRequestDTO } from "@/Application/Dto/Hub/hubProfile.dto";

export interface IResetHubPasswordUseCase {
    execute(agencyId: string, dto: HubResetPasswordRequestDTO): Promise<void>;
}