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
import { IAdminRepository } from "../../../interfaces/repositories_interfaces/adminRepositories_Interfaces/IAdminRepository";
import { INotificationService } from "../../../interfaces/services_Interfaces/Notification/INotificationService";
import { INotificationSocketService } from "../../../interfaces/services_Interfaces/Notification/INotificationSocketService";

@injectable()
export class ReSubmitTravelerKycUseCase implements IReSubmitTravelerKycUseCase {
    constructor(
        @inject("IUploadWorkerKycFilesUsecase") private _uploadWorkerKycFilesUsecase: IUploadWorkerKycFilesUsecase,
        @inject("IHubWorkerKycRepository") private _hubWorkerKycRepo: IHubWorkerKycRepository,
        @inject("IUserRepository") private _userRepo: IUserRepository,

        @inject("IAdminRepository") private readonly _adminRepo: IAdminRepository,
        @inject("INotificationService") private readonly _notificationService: INotificationService,
        @inject("INotificationSocketService") private readonly _notificationSocketService: INotificationSocketService,
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

        const admin = await this._adminRepo.findOne({});
        if (admin && admin.id) await this._notifyAdmin(user.name, admin.id.toString());
    };

    private async _notifyAdmin(name: string, adminId: string): Promise<void> {
        const savedNotification = await this._notificationService.createNotification(
            adminId,
            "KYC Application Resubmitted",
            `User ${name || ""} has resubmitted KYC documents and is awaiting review.`,
        );
        this._notificationSocketService.emitNotification(adminId, savedNotification);
    };
}