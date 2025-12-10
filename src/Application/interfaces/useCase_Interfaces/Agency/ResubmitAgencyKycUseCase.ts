import { AgencyKYCFileFields } from "../../../../Infrastructure/services/storage/multer";
import { AgencyResubmitKycDTO } from "../../../Dto/Agency/agency.dto";

export interface IRsubmitAgencyKycUseCase {
    execute( dto: AgencyResubmitKycDTO , files:any ): Promise<AgencyResubmitKycDTO>;
}