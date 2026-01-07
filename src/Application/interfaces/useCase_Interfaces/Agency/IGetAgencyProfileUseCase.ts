import { AgencyProfileResponseDTO } from "../../../Dto/Agency/agencyProfile.dto";

export interface IGetAgencyProfileUseCase{
    execute(agencyId:string):Promise<AgencyProfileResponseDTO>;
}