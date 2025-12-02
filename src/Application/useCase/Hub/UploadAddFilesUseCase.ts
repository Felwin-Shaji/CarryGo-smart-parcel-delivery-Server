import { inject, injectable } from "tsyringe";
import { IStorageService } from "../../interfaces/services_Interfaces/storage-service.interface";
import { IUploadAddFilesUseCase } from "../../interfaces/useCase_Interfaces/Hub/IUploadAddFilesUseCase";
import { AddHubDTO } from "../../Dto/Agency/agency.dto";
import { AppError } from "../../../Domain/utils/customError";
import { AgencyAddHubFields } from "../../../Infrastructure/services/storage/multer";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";

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