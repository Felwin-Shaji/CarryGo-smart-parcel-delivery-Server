import { inject, injectable } from "tsyringe";
import { SubmitTravelerKycRequestDTO } from "../../../Dto/User/traveler.dto";
import { ISubmitTravelerKycUseCase } from "../../../interfaces/useCase_Interfaces/user/Traveler/ISubmitTravelerKycUseCase";
import { IUploadWorkerKycFilesUsecase } from "../../../interfaces/useCase_Interfaces/Worker/uploadWorkerKycFilesUsecase";
import { WorkerKYCFileFields } from "../../../../Infrastructure/services/storage/multer";
import { AppError } from "../../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { IHubWorkerKycRepository } from "../../../interfaces/repositories_interfaces/workerRepository_interfaces/wrokerKyc.repository";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { WorkerMapper } from "../../../Mappers/Workers/WorkerMapper";
import { IAdminRepository } from "../../../interfaces/repositories_interfaces/adminRepositories_Interfaces/IAdminRepository";
import { INotificationService } from "../../../interfaces/services_Interfaces/Notification/INotificationService";
import { INotificationSocketService } from "../../../interfaces/services_Interfaces/Notification/INotificationSocketService";

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