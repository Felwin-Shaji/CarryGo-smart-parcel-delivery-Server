import { AgencyAddHubFields } from "../../../../Infrastructure/services/storage/multer";

export interface IUploadAddFilesUseCase {
    execute(files: AgencyAddHubFields): Promise<string>
}


