import { EditHubProfileRequestDto, HubProfileResponseDTO } from "../../../Dto/Hub/hubProfile.dto";

export interface IEditHubProfileUseCase {
    execute(agencyId: string, dto: EditHubProfileRequestDto): Promise<HubProfileResponseDTO>;
}