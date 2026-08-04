import { EditHubProfileRequestDto, HubProfileResponseDTO } from "../../../DTOs/Hub/hubProfile.dto";

export interface IEditHubProfileUseCase {
    execute(agencyId: string, dto: EditHubProfileRequestDto): Promise<HubProfileResponseDTO>;
}