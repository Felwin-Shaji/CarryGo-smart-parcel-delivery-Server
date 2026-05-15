import { inject, injectable } from "tsyringe";
import { IHubTempRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hubTemp.repository";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { IPasswordService } from "../../interfaces/services_Interfaces/password-service.interface";
import { IMailService } from "../../interfaces/services_Interfaces/email-service.interface";
import { AppError } from "../../../Domain/utils/customError";
import { HubMapper } from "../../Mappers/Hub/HubMapper";
import { IAddHubUseCase } from "../../interfaces/useCase_Interfaces/Hub/IAddHubUseCase";
import { AddNewHubAddressDto } from "../../Dto/Agency/agency.dto";
import { ENV } from "../../../Infrastructure/constants/env";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { INotificationSocketService } from "../../interfaces/services_Interfaces/Notification/INotificationSocketService";
import { INotificationService } from "../../interfaces/services_Interfaces/Notification/INotificationService";
import { IAdminRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/admin.repository";

@injectable()
export class AddHubUseCase implements IAddHubUseCase {

    constructor(
        @inject("IHubTempRepository") private _hubTempRepo: IHubTempRepository,
        @inject("IHubRepository") private _hubRepo: IHubRepository,
        @inject("IPasswordService") private _passwordService: IPasswordService,
        @inject("IMailService") private _mailService: IMailService,

        @inject("IAdminRepository") private _adminRepo: IAdminRepository,
        @inject("INotificationService") private _notificationService: INotificationService,
        @inject("INotificationSocketService") private _notificationSocketService: INotificationSocketService,
    ) { }

    async execute(
        tempHubId: string,
        extraData: AddNewHubAddressDto,
        imageUrl: string
    ) {
        const tempHub = await this._hubTempRepo.findOne({ _id: tempHubId });
        if (!tempHub) throw new AppError(HUB_MESSAGES.SESSION_INVALID, STATUS.BAD_REQUEST);

        if (tempHub.status !== "OTP-Verified") throw new AppError(HUB_MESSAGES.OTP_NOT_VERIFIED, STATUS.BAD_REQUEST);


        const rawPassword = this._passwordService.generateCustomPassword(
            tempHub.email,
            tempHub.mobile
        );
        const hashedPassword = await this._passwordService.hashPassword(rawPassword);

        tempHub.addressLine1 = extraData.addressLine1;
        tempHub.city = extraData.city;
        tempHub.state = extraData.state;
        tempHub.pincode = extraData.pincode;
        tempHub.location_lat = extraData.location_lat;
        tempHub.location_lng = extraData.location_lng;

        const hubEntity = HubMapper.toCreateHub(tempHub, hashedPassword, imageUrl);

        const admin = await this._adminRepo.findOne({});

        const savedHub = await this._hubRepo.saveHub(hubEntity);

        if (admin?.id) {
            await this._notifyAdmin(
                admin.id.toString(),
                savedHub.name,
                savedHub.name
            );
        };

        await this._hubTempRepo.delete({ _id: tempHubId });
        if (ENV.IS_PROD) await this._mailService.sendCustomPassword(tempHub.email);

        const responseDTO = HubMapper.toAgencyAddHubResponseDTO(savedHub);

        return responseDTO;
    };

    private async _notifyAdmin(adminId: string, hubName: string, agencyName?: string): Promise<void> {

        const notification =
            await this._notificationService.createNotification(
                adminId,
                "New Hub Approval Request",
                `A new hub "${hubName}" was added by agency "${agencyName || "Unknown Agency"}" and is waiting for approval.`
            );

        this._notificationSocketService.emitNotification(
            adminId,
            notification
        );
    }


}
