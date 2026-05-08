import { Notification } from "@/Domain/Entities/Notification/Notification";

export interface INotificationService {
    createNotification(userId: string, title: string, message: string): Promise<Notification>;
};