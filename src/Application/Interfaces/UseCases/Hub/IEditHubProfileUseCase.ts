import { EditHubProfileRequestDto, HubProfileResponseDTO } from "../../../DTOs/Hub/HubProfileDTO";

export interface IEditHubProfileUseCase {
    execute(agencyId: string, dto: EditHubProfileRequestDto): Promise<HubProfileResponseDTO>;
}