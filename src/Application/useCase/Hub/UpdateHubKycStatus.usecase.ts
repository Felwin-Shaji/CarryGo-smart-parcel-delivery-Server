import { inject, injectable } from "tsyringe";
import { IUpdateHubKycStatusUseCase } from "../../interfaces/useCase_Interfaces/Hub/IUpdateHubKycStatusUseCase";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { updateHubKycStatusDTO } from "../../Dto/Hub/hub.dto";
import { IAgencyRepository } from "@/Application/interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { INotificationService } from "@/Application/interfaces/services_Interfaces/Notification/INotificationService";
import { INotificationSocketService } from "@/Application/interfaces/services_Interfaces/Notification/INotificationSocketService";

@injectable()
export class UpdateHubKycStatusUseCase implements IUpdateHubKycStatusUseCase {
    constructor(
        @inject("IHubRepository") private _hubRepo: IHubRepository,
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
        @inject("INotificationService") private _notificationService: INotificationService,
        @inject("INotificationSocketService") private _notificationSocketService: INotificationSocketService,
    ) { };

    async execute(hubId: string, dto: updateHubKycStatusDTO): Promise<void> {
        await this._hubRepo.updateKycSatus(hubId, dto);

        const hub = await this._hubRepo.getHubById(hubId);
        if (!hub || !hub.id) return;
        await this._notifyHub(
            hub.id.toString(),
            hub.name,
            dto.status
        );

        if (hub.agencyId) {
            const agency = await this._agencyRepo.findById({ _id: hub.agencyId.toString() });

            if (agency && agency.id) {
                await this._notifyAgency(
                    agency.id.toString(),
                    hub.name,
                    dto.status
                );
            }

        }

    };

    private async _notifyHub(hubId: string, hubName: string, status: string): Promise<void> {

        const notification =
            await this._notificationService.createNotification(
                hubId,
                "Hub KYC Status Updated",
                `Your hub "${hubName}" KYC status was updated to "${status}".`
            );

        this._notificationSocketService.emitNotification(
            hubId,
            notification
        );
    };

    private async _notifyAgency(agencyId: string, hubName: string, status: string): Promise<void> {

        const notification =
            await this._notificationService.createNotification(
                agencyId,
                "Hub KYC Status Updated",
                `Hub "${hubName}" KYC status was updated to "${status}".`
            );

        this._notificationSocketService.emitNotification(
            agencyId,
            notification
        );
    }
}