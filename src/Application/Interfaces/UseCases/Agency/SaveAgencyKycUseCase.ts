import { AgencyKYC } from "../../../../Domain/Entities/Agency/AgencyKYC.js";
import { AgencyKYC_DTO, UploadedKycFiles  } from "../../../DTOs/Agency/agency.dto.js";

export interface ISaveAgencyKycUseCase  {
    execute(dto: AgencyKYC_DTO, uploadedFiles: UploadedKycFiles):Promise<AgencyKYC> ;
}

