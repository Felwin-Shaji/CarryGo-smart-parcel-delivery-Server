import { AgencyProfileResponseDTO, EditAgencyProfileRequestDto } from "../../../DTOs/Agency/agencyProfile.dto";

export interface IEditAgencyProfileUseCase {
    execute(agencyId: string, dto: EditAgencyProfileRequestDto): Promise<AgencyProfileResponseDTO>;
}