import { INotificationRepository, NotificationFilter } from "../../Interfaces/Repositories/Notification/INotificationRepository";
import { IGetNotificationsUseCase } from "../../Interfaces/UseCases/Notification/IGetNotificationsUseCase";
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