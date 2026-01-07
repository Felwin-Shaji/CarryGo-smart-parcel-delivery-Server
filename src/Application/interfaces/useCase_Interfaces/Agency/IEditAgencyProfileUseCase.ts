import { AgencyProfileResponseDTO, EditAgencyProfileRequestDto } from "../../../Dto/Agency/agencyProfile.dto";

export interface IEditAgencyProfileUseCase {
    execute(agencyId: string, dto: EditAgencyProfileRequestDto): Promise<AgencyProfileResponseDTO>;
}