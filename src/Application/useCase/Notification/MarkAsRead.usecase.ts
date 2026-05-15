import { INotificationRepository } from "../../interfaces/repositories_interfaces/NotificationRepository_interfaces/INotificationRepository";
import { IMarkAsReadUseCase } from "../../interfaces/useCase_Interfaces/Notification/IMarkAsReadUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class MarkAsReadUseCase implements IMarkAsReadUseCase {
    constructor(
        @inject("INotificationRepository") private repo: INotificationRepository
    ) { }

    async execute(notificationId: string): Promise<void> {
        await this.repo.markAsRead(notificationId);
    }
}