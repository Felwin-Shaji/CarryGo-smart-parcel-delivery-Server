import { inject, injectable } from "tsyringe";
import { IStorageService } from "../../interfaces/services_Interfaces/storage-service.interface";
import { IUploadAddFilesUseCase } from "../../interfaces/useCase_Interfaces/Hub/IUploadAddFilesUseCase";
import { AddHubDTO } from "../../Dto/Agency/agency.dto";
import { AppError } from "../../../Domain/utils/customError";

@injectable()
export class UploadAddFilesUseCase implements IUploadAddFilesUseCase {
    constructor(

        @inject("IStorageService") private _storage: IStorageService,
    ) { }

    async execute(dto: AddHubDTO): Promise< string > {
        if (!dto.verificationImage) {
            throw new AppError("Verification image is required");
        }
        try {
            const imageUrl = await this._storage.upload(
                dto.verificationImage,
                `hub/verification/${dto.agencyId}`
            );

            return imageUrl ;

        } catch (error) {
            throw new AppError("Failed to upload verification image");
        }
    }
} 