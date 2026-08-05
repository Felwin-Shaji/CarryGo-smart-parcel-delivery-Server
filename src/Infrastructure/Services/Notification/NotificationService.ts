import { inject, injectable } from "tsyringe";
import { INotificationService } from "../../../Application/Interfaces/Services/Notification/INotificationService";
import { INotificationRepository } from "../../../Application/Interfaces/Repositories/Notification/INotificationRepository";
import { Notification } from "../../../Domain/Entities/Notification/Notification";

@injectable()
export class NotificationService implements INotificationService {
    constructor(
        @inject("INotificationRepository") private _repo: INotificationRepository
    ) { }

    async createNotification(userId: string, title: string, message: string): Promise<Notification> {
        const notification = await this._repo.create({
            userId,
            title,
            message,
            isRead: false,
            createdAt: new Date(),
        });

        return notification;
    }

}