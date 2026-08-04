import { AgencyProfileResponseDTO, EditAgencyProfileRequestDto } from "../../../DTOs/Agency/AgencyProfileDTO";

export interface IEditAgencyProfileUseCase {
    execute(agencyId: string, dto: EditAgencyProfileRequestDto): Promise<AgencyProfileResponseDTO>;
}