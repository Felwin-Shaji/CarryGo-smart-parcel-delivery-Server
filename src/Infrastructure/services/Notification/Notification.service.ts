import { INotificationRepository } from "@/Application/interfaces/repositories_interfaces/NotificationRepository_interfaces/INotificationRepository";
import { INotificationService } from "@/Application/interfaces/services_Interfaces/Notification/INotificationService";
import { Notification } from "@/Domain/Entities/Notification/Notification";
import { inject, injectable } from "tsyringe";

@injectable()
export class NotificationService implements INotificationService {
    constructor(
        @inject("INotificationRepository") private repo: INotificationRepository
    ) { }

    async createNotification(userId: string, title: string, message: string): Promise<Notification> {
        const notification = await this.repo.create({
            userId,
            title,
            message,
            isRead: false,
            createdAt: new Date(),
        });

        //  Future: emit socket here (no rewrite needed)
        // socket.emit("notification", notification);

        return notification;
    }

}