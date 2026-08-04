import { INotificationRepository } from "../../Interfaces/Repositories/Notification/INotificationRepository";
import { IMarkAsReadUseCase } from "../../Interfaces/UseCases/Notification/IMarkAsReadUseCase";
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