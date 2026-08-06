import { AgencyProfileResponseDTO } from "../../../DTOs/Agency/AgencyProfileDTO";

export interface IGetAgencyProfileUseCase{
    execute(agencyId:string):Promise<AgencyProfileResponseDTO>;
}