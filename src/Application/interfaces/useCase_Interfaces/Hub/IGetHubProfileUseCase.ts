import { HubProfileResponseDTO } from "@/Application/Dto/Hub/hubProfile.dto";

export interface IGetHubProfileUseCase {
    execute(agencyId: string): Promise<HubProfileResponseDTO>;
}