import { AgencyKYC } from "../../../../Domain/Entities/Agency/AgencyKYC.js";
import { AgencyKYC_DTO } from "../../../Dto/Agency/agency.dto.js";


export interface ISaveAgencyKycUseCase  {
    execute(dto: AgencyKYC_DTO, uploadedFiles: any):Promise<AgencyKYC> ;
}

