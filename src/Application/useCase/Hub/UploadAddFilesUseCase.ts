import { inject, injectable } from "tsyringe";
import { IStorageService } from "../../interfaces/services_Interfaces/storage-service.interface";
import { IUploadAddFilesUseCase } from "../../interfaces/useCase_Interfaces/Hub/IUploadAddFilesUseCase";
import { AddHubDTO } from "../../Dto/Agency/agency.dto";
import { AppError } from "../../../Domain/utils/customError";
import { AgencyAddHubFields } from "../../../Infrastructure/services/storage/multer";

@injectable()
export class UploadAddFilesUseCase implements IUploadAddFilesUseCase {

    constructor(
        @inject("IStorageService") private _storage: IStorageService,
    ) { }

    async execute(files: AgencyAddHubFields): Promise<string> {

        if (!files.verificationImage || !files.verificationImage[0]) {
            throw new AppError("Verification image is required");
        }

        const buffer = files.verificationImage[0].buffer;

        try {
            const imageUrl = await this._storage.upload(
                buffer,
                `hub/verification`
            );

            return imageUrl;

        } catch (error) {
            throw new AppError("Failed to upload verification image");
        }
    }
}