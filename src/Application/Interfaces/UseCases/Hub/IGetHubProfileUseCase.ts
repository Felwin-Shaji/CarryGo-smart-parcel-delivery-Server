import { HubProfileResponseDTO } from "../../../DTOs/Hub/HubProfileDTO";

export interface IGetHubProfileUseCase {
    execute(agencyId: string): Promise<HubProfileResponseDTO>;
}