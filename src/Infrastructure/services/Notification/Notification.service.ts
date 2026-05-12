import { INotificationRepository } from "@/Application/interfaces/repositories_interfaces/NotificationRepository_interfaces/INotificationRepository";
import { INotificationService } from "@/Application/interfaces/services_Interfaces/Notification/INotificationService";
import { Notification } from "@/Domain/Entities/Notification/Notification";
import { inject, injectable } from "tsyringe";

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