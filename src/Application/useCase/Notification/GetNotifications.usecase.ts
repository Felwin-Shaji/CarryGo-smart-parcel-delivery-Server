import { INotificationRepository, NotificationFilter } from "@/Application/interfaces/repositories_interfaces/NotificationRepository_interfaces/INotificationRepository";
import { IGetNotificationsUseCase } from "@/Application/interfaces/useCase_Interfaces/Notification/IGetNotificationsUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetNotificationsUseCase implements IGetNotificationsUseCase {
    constructor(
        @inject("INotificationRepository")
        private repo: INotificationRepository
    ) { }

    async execute(
        userId: string,
        page: number,
        limit: number,
        filter: NotificationFilter
    ) {
        return this.repo.findByUserId(userId, page, limit, filter);
    }
}