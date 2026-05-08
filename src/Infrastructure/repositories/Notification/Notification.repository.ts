import { INotificationRepository } from "@/Application/interfaces/repositories_interfaces/NotificationRepository_interfaces/INotificationRepository";
import { Notification } from "@/Domain/Entities/Notification/Notification";
import { NotificationDocument, NotificationModel } from "@/Infrastructure/database/models/Notification/NotificationModel";
import { FilterQuery, Types } from "mongoose";

export class NotificationRepository implements INotificationRepository {

    async create(notification: Partial<Notification>): Promise<Notification> {
        const created = await NotificationModel.create({
            userId: new Types.ObjectId(notification.userId),
            title: notification.title,
            message: notification.message,
            isRead: notification.isRead ?? false,
        });

        return this.toDomain(created);
    }

    async findByUserId(
        userId: string,
        page: number = 1,
        limit: number = 10,
        filter: "ALL" | "READ" | "UNREAD" = "ALL"
    ): Promise<{
        data: Notification[];
        total: number;
        page: number;
        totalPages: number;
    }> {
        const skip = (page - 1) * limit;
        const objectUserId = new Types.ObjectId(userId);

        const query: FilterQuery<NotificationDocument> = { userId: objectUserId };

        if (filter === "READ") {
            query.isRead = true;
        } else if (filter === "UNREAD") {
            query.isRead = false;
        }

        const [docs, total] = await Promise.all([
            NotificationModel.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            NotificationModel.countDocuments(query),
        ]);

        return {
            data: docs.map(this.toDomain),
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    };

    async markAsRead(notificationId: string): Promise<void> {
        await NotificationModel.findByIdAndUpdate(notificationId, {
            isRead: true,
            updatedAt: new Date(),
        });
    }

    async markAllAsRead(userId: string): Promise<void> {
        await NotificationModel.updateMany(
            {
                userId: new Types.ObjectId(userId),
                isRead: false,
            },
            {
                isRead: true,
                updatedAt: new Date(),
            }
        );
    }

    async delete(notificationId: string): Promise<void> {
        await NotificationModel.findByIdAndDelete(notificationId);
    };

    async getUnreadCount(userId: string): Promise<number> {
        return NotificationModel.countDocuments({
            userId: new Types.ObjectId(userId),
            isRead: false,
        });
    }

    private toDomain = (doc: NotificationDocument): Notification => {
        return {
            id: doc._id.toString(),
            userId: doc.userId.toString(),
            title: doc.title,
            message: doc.message,
            isRead: doc.isRead,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    };
}