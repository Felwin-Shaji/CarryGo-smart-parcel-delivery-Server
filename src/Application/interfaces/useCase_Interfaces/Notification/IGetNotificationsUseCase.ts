import { Notification } from "@/Domain/Entities/Notification/Notification";
import { NotificationFilter } from "../../repositories_interfaces/NotificationRepository_interfaces/INotificationRepository";

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