import { AgencyProfileResponseDTO } from "../../../DTOs/Agency/agencyProfile.dto";

export interface IGetAgencyProfileUseCase{
    execute(agencyId:string):Promise<AgencyProfileResponseDTO>;
}