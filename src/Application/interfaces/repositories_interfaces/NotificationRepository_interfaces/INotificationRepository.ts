import { Notification } from "../../../../Domain/Entities/Notification/Notification";

export type NotificationFilter = "ALL" | "READ" | "UNREAD";

export interface INotificationRepository {
    create(data: Partial<Notification>): Promise<Notification>;

    findByUserId(
        userId: string,
        page: number,
        limit: number,
        filter: NotificationFilter
    ): Promise<{
        data: Notification[];
        total: number;
        page: number;
        totalPages: number;
    }>;

    markAsRead(id: string): Promise<void>;

    markAllAsRead(userId: string): Promise<void>;

    getUnreadCount(userId: string): Promise<number>;

};