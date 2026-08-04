import { Notification } from "../../../../Domain/Entities/Notification/Notification";
import { NotificationFilter } from "../../Repositories/Notification/INotificationRepository";

export interface IGetNotificationsUseCase {
    execute(
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
}