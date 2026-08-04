import { inject, injectable } from "tsyringe";
import { IStorageService } from "../../Interfaces/Services/storage-service.interface";
import { IUploadAddFilesUseCase } from "../../Interfaces/UseCases/Hub/IUploadAddFilesUseCase";
import { AppError } from "../../../Domain/Utils/customError";
import { AgencyAddHubFields } from "../../../Infrastructure/Services/Storage/multer";
import { HUB_MESSAGES } from "../../../Infrastructure/Constants/Messages/hubMessage";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";


@injectable()
export class UploadAddFilesUseCase implements IUploadAddFilesUseCase {

    constructor(
        @inject("IStorageService") private _storage: IStorageService,
    ) { }

    async execute(files: AgencyAddHubFields): Promise<string> {

        if (!files.verificationImage || !files.verificationImage[0]) {
            throw new AppError(HUB_MESSAGES.VERIFICATION_IMAGE_REQUIRED, STATUS.BAD_REQUEST);
        }

        const buffer = files.verificationImage[0].buffer;

        const imageUrl = await this._storage.upload(
            buffer,
            `hub/verification`
        );

        return imageUrl;
    }
}