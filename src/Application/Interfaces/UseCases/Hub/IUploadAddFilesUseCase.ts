import { AgencyAddHubFields } from "../../../../Infrastructure/Services/Storage/multer";

export interface IUploadAddFilesUseCase {
    execute(files: AgencyAddHubFields): Promise<string>
}


