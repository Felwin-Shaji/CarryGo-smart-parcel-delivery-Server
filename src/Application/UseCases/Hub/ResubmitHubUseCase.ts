import { inject, injectable } from "tsyringe";
import { IResubmitHubUseCase } from "../../Interfaces/UseCases/Hub/IResubmitHubUseCase";
import { IHubRepository } from "../../Interfaces/Repositories/Hub/IHubRepository";
import { IAdminRepository } from "../../Interfaces/Repositories/Admin/IAdminRepository";
import { IUploadAddFilesUseCase } from "../../Interfaces/UseCases/Hub/IUploadAddFilesUseCase";
import { INotificationService } from "../../Interfaces/Services/Notification/INotificationService";
import { INotificationSocketService } from "../../Interfaces/Services/Notification/INotificationSocketService";
import { AgencyAddHubFields } from "../../../Infrastructure/Services/Storage/multer";
import { AppError } from "../../../Domain/Utils/customError";
import { HUB_MESSAGES } from "../../../Infrastructure/Constants/Messages/hubMessages";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { HubMapper } from "../../Mappers/Hub/HubMapper";
import { ResubmitHubDTO } from "../../DTOs/Agency/AgencyDTO";

@injectable()
export class ResubmitHubUseCase implements IResubmitHubUseCase {
    constructor(
        @inject("IHubRepository") private _hubRepo: IHubRepository,
        @inject("IAdminRepository") private _adminRepo: IAdminRepository,
        @inject("IUploadAddFilesUseCase") private _uploadAddFilesUseCase: IUploadAddFilesUseCase,
        @inject("INotificationService") private _notificationService: INotificationService,
        @inject("INotificationSocketService") private _notificationSocketService: INotificationSocketService,
    ) { };

    async execute(hubId: string, data: ResubmitHubDTO, files: AgencyAddHubFields): Promise<string> {
        const hub = await this._hubRepo.findOne({ _id: hubId });
        if (!hub) throw new AppError(HUB_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        let finalImageUrl: string;

        if (files && files.verificationImage && files.verificationImage[0]) {
            finalImageUrl = await this._uploadAddFilesUseCase.execute(files);
        } else if (data.verificationImage && typeof data.verificationImage === "string") {
            finalImageUrl = data.verificationImage;
        } else {
            throw new AppError(HUB_MESSAGES.VERIFICATION_IMAGE_REQUIRED, STATUS.BAD_REQUEST);
        }

        const hubEntity = HubMapper.toResubmitHub(hub, data, finalImageUrl);

        const updateData = await this._hubRepo.findOneAndUpdate(
            { _id: hub.id },
            {
                address: hubEntity.address,

                location: {
                    type: "Point",
                    coordinates: [
                        hubEntity.location.lng,
                        hubEntity.location.lat
                    ]
                },

                verificationImage: hubEntity.verificationImage,

                kycStatus: hubEntity.kycStatus,

                rejectReason: hubEntity.rejectReason
            }
        );

        if (!updateData || !updateData.id) {
            throw new AppError(HUB_MESSAGES.UPDATE_FAILED, STATUS.BAD_REQUEST);
        }

        const admin = await this._adminRepo.findOne({});
        if (admin?.id) {
            await this._notifyAdmin(admin.id.toString(), updateData.name);
        }

        return updateData.id.toString();
    }

    private async _notifyAdmin(adminId: string, hubName: string): Promise<void> {
        const notification = await this._notificationService.createNotification(
            adminId,
            "Hub KYC Resubmission Request",
            `The hub "${hubName}" has updated its profile entries and resubmitted documents for review.`
        );

        this._notificationSocketService.emitNotification(adminId, notification);
    }
}