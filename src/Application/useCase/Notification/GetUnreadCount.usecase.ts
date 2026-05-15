import { INotificationRepository } from "../../interfaces/repositories_interfaces/NotificationRepository_interfaces/INotificationRepository";
import { IGetUnreadCountUseCase } from "../../interfaces/useCase_Interfaces/Notification/IGetUnreadCountUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetUnreadCountUseCase implements IGetUnreadCountUseCase {
    constructor(
        @inject("INotificationRepository") private repo: INotificationRepository
    ) { }

    async execute(userId: string): Promise<number> {
        return this.repo.getUnreadCount(userId);
    }
}