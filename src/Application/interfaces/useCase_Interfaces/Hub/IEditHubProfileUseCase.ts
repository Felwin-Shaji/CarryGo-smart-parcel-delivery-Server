import { EditHubProfileRequestDto, HubProfileResponseDTO } from "@/Application/Dto/Hub/hubProfile.dto";

export interface IEditHubProfileUseCase {
    execute(agencyId: string, dto: EditHubProfileRequestDto): Promise<HubProfileResponseDTO>;
}