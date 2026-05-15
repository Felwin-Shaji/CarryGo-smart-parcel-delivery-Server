import { HubResetPasswordRequestDTO } from "../../../Dto/Hub/hubProfile.dto";

export interface IResetHubPasswordUseCase {
    execute(agencyId: string, dto: HubResetPasswordRequestDTO): Promise<void>;
}