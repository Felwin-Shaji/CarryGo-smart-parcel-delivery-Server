import { AgencyAddHubFields } from "../../../../Infrastructure/services/storage/multer";
import { AddHubDTO } from "../../../Dto/Agency/agency.dto";

export interface IUploadAddFilesUseCase {
    execute(files: AgencyAddHubFields): Promise<string>
}


