import { inject, injectable } from "tsyringe";
import { IReSubmitTravelerKycUseCase } from "../../../interfaces/useCase_Interfaces/user/Traveler/IReSubmitTravelerKycUseCase";
import { IUploadWorkerKycFilesUsecase } from "../../../interfaces/useCase_Interfaces/Worker/uploadWorkerKycFilesUsecase";
import { IHubWorkerKycRepository } from "../../../interfaces/repositories_interfaces/workerRepository_interfaces/wrokerKyc.repository";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { SubmitTravelerKycRequestDTO } from "../../../Dto/User/traveler.dto";
import { WorkerKYCFileFields } from "../../../../Infrastructure/services/storage/multer";
import { AppError } from "../../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { Role } from "../../../../Domain/Enums/Roles";
import { KycStatus } from "../../../../Domain/Enums/KycStatus";

@injectable()
export class ReSubmitTravelerKycUseCase implements IReSubmitTravelerKycUseCase {
    constructor(
        @inject("IUploadWorkerKycFilesUsecase") private _uploadWorkerKycFilesUsecase: IUploadWorkerKycFilesUsecase,
        @inject("IHubWorkerKycRepository") private _hubWorkerKycRepo: IHubWorkerKycRepository,
        @inject("IUserRepository") private _userRepo: IUserRepository
    ) { }

    async execute(userId: string, kycData: SubmitTravelerKycRequestDTO, files: WorkerKYCFileFields): Promise<void> {

        const user = await this._userRepo.findById({ _id: userId });
        if (!user || !user.id) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);
        if (user.kycStatus !== KycStatus.REJECTED) throw new AppError(USER_MESSAGES.KYC_NOT_ELIGIBLE_FOR_RESUBMIT, STATUS.BAD_REQUEST);

        const existingKyc = await this._hubWorkerKycRepo.getKycBySubjectId(userId, Role.USER);
        if (!existingKyc) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        if (files.document || files.selfie) {
            const uploadedFiles = await this._uploadWorkerKycFilesUsecase.execute(files);

            if (!uploadedFiles.document || !uploadedFiles.selfie) {
                throw new AppError(
                    USER_MESSAGES.TRAVELER_FILE_UPLOAD_FAILURE,
                    STATUS.BAD_REQUEST
                );
            };

            existingKyc.documentUrl = uploadedFiles.document;
            existingKyc.selfieUrl = uploadedFiles.selfie;
        }



        existingKyc.idType = kycData.idType;
        existingKyc.idNumberEncrypted = kycData.idNumber;
        existingKyc.status = KycStatus.RESUBMITTED;

        await this._hubWorkerKycRepo.findOneAndUpdate({ subjectId: userId, subjectType: Role.USER }, existingKyc);

        user.kycStatus = KycStatus.RESUBMITTED;
        user.rejectReason = null;
        await this._userRepo.findOneAndUpdate({ _id: user.id }, user);
    }
}