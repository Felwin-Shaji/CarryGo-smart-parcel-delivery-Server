import { inject, injectable } from "tsyringe";
import { SubmitTravelerKycRequestDTO } from "../../../DTOs/User/TravelerDTO";
import { ISubmitTravelerKycUseCase } from "../../../Interfaces/UseCases/User/Traveler/ISubmitTravelerKycUseCase";
import { IUploadWorkerKycFilesUsecase } from "../../../Interfaces/UseCases/Worker/IUploadWorkerKycFilesUseCase";
import { WorkerKYCFileFields } from "../../../../Infrastructure/Services/Storage/multer";
import { AppError } from "../../../../Domain/Utils/customError";
import { USER_MESSAGES } from "../../../../Infrastructure/Constants/Messages/userMessage";
import { STATUS } from "../../../../Infrastructure/Constants/statusCodes";
import { IHubWorkerKycRepository } from "../../../Interfaces/Repositories/Worker/IHubWorkerKycRepository";
import { IUserRepository } from "../../../Interfaces/Repositories/User/IUserRepository";
import { WorkerMapper } from "../../../Mappers/Worker/WorkerMapper";
import { IAdminRepository } from "../../../Interfaces/Repositories/Admin/IAdminRepository";
import { INotificationService } from "../../../Interfaces/Services/Notification/INotificationService";
import { INotificationSocketService } from "../../../Interfaces/Services/Notification/INotificationSocketService";

@injectable()
export class SubmitTravelerKycUseCase implements ISubmitTravelerKycUseCase {
    constructor(
        @inject("IUploadWorkerKycFilesUsecase") private _uploadWorkerKycFilesUsecase: IUploadWorkerKycFilesUsecase,
        @inject("IHubWorkerKycRepository") private _hubWorkerKycRepo: IHubWorkerKycRepository,
        @inject("IUserRepository") private _userRepo: IUserRepository,

        @inject("IAdminRepository") private readonly _adminRepo: IAdminRepository,
        @inject("INotificationService") private readonly _notificationService: INotificationService,
        @inject("INotificationSocketService") private readonly _notificationSocketService: INotificationSocketService,
    ) { }

    async execute(userId: string, kycData: SubmitTravelerKycRequestDTO, files: WorkerKYCFileFields): Promise<void> {

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

        const admin = await this._adminRepo.findOne({});
        if (admin && admin.id) await this._notifyAdmin(user.name, admin.id.toString());

    };

    private async _notifyAdmin(name: string, adminId: string): Promise<void> {
        const savedNotification = await this._notificationService.createNotification(
            adminId,
            "KYC Application Submitted",
            `User ${name || ""} has submitted KYC documents and is awaiting review.`,
        );
        this._notificationSocketService.emitNotification(adminId, savedNotification);
    }

}