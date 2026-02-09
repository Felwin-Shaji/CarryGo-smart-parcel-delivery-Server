import { inject, injectable } from "tsyringe";
import { SubmitTravelerKycRequestDTO } from "../../../Dto/User/traveler.dto";
import { ISubmitTravelerKycUseCase } from "../../../interfaces/useCase_Interfaces/user/Traveler/ISubmitTravelerKycUseCase";
import { IUploadWorkerKycFilesUsecase, UploadedWorkerKycFiles } from "../../../interfaces/useCase_Interfaces/Worker/uploadWorkerKycFilesUsecase";
import { WorkerKYCFileFields } from "../../../../Infrastructure/services/storage/multer";
import { AppError } from "../../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { IHubWorkerKycRepository } from "../../../interfaces/repositories_interfaces/workerRepository_interfaces/wrokerKyc.repository";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { WorkerMapper } from "../../../Mappers/Workers/WorkerMapper";

@injectable()
export class SubmitTravelerKycUseCase implements ISubmitTravelerKycUseCase {
    constructor(
        @inject("IUploadWorkerKycFilesUsecase") private _uploadWorkerKycFilesUsecase: IUploadWorkerKycFilesUsecase,
        @inject("IHubWorkerKycRepository") private _hubWorkerKycRepo: IHubWorkerKycRepository,
        @inject("IUserRepository") private _userRepo: IUserRepository


    ) { }

    async execute(userId: string, kycData: SubmitTravelerKycRequestDTO, files: WorkerKYCFileFields): Promise<void> {
        console.log("Submitting KYC for user:", userId);
        console.log("KYC Data:", kycData);

        const uploadedFiles = await this._uploadWorkerKycFilesUsecase.execute(files);
        if (!uploadedFiles.document || !uploadedFiles.selfie) {
            throw new AppError(
                USER_MESSAGES.TRAVELER_FILE_UPLOAD_FAILURE,
                STATUS.BAD_REQUEST
            );
        }

        const user = await this._userRepo.findById({ _id: userId });
        if (!user || !user.id) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);
        if (user.kycStatus === "APPROVED") throw new AppError(USER_MESSAGES.KYC_ALREADY_APPROVED, STATUS.BAD_REQUEST);

        const kycEntity = WorkerMapper.toWorkerKycEntity(
            user.id,
            kycData.idType,
            uploadedFiles.document,
            uploadedFiles.selfie,
            kycData.idNumber,
            "user"
        );

        await this._hubWorkerKycRepo.save(kycEntity);
        user.kycStatus = "REGISTERED";
        await this._userRepo.findOneAndUpdate({ _id: user.id }, user);

    }

}