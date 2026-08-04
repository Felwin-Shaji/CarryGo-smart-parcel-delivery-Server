import { AgencyAddHubFields } from "../../../../Infrastructure/Services/Storage/multer";
import { ResubmitHubDTO } from "../../../DTOs/Agency/agency.dto";

export interface IResubmitHubUseCase {
    execute(hubId: string, data: ResubmitHubDTO, files: AgencyAddHubFields): Promise<string>;
}