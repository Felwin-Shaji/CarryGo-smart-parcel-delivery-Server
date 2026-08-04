import { HubProfileResponseDTO } from "../../../DTOs/Hub/hubProfile.dto";

export interface IGetHubProfileUseCase {
    execute(agencyId: string): Promise<HubProfileResponseDTO>;
}