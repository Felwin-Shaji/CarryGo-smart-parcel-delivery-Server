import { INotificationRepository, NotificationFilter } from "../../interfaces/repositories_interfaces/NotificationRepository_interfaces/INotificationRepository";
import { IGetNotificationsUseCase } from "../../interfaces/useCase_Interfaces/Notification/IGetNotificationsUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetNotificationsUseCase implements IGetNotificationsUseCase {
    constructor(
        @inject("INotificationRepository") private _repo: INotificationRepository
    ) { }

    async execute(
        userId: string,
        page: number,
        limit: number,
        filter: NotificationFilter
    ) {
        const notifications = await this._repo.findByUserId(userId, page, limit, filter);
        return notifications;
    }
}