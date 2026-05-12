import { Notification } from "@/Domain/Entities/Notification/Notification";

export interface INotificationSocketService {

    connect(): void;

    emitNotification(
        userId: string,
        notification: Notification
    ): void;

    emitNotificationRead(
        userId: string,
        notificationId: string
    ): void;

    emitAllNotificationsRead(
        userId: string
    ): void;
}