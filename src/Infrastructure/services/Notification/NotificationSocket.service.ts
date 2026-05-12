import { container, inject, injectable } from "tsyringe";
import { Server, Socket } from "socket.io";
import { INotificationSocketService } from "@/Application/interfaces/services_Interfaces/Notification/INotificationSocketService";
import { Notification } from "@/Domain/Entities/Notification/Notification";


@injectable()
export class NotificationSocketService implements INotificationSocketService {

    constructor(

    ) { }

    connect(): void {

        this.io.on("connection", (socket: Socket) => {

            const { userId } = socket.handshake.auth;

            if (userId) {

                socket.join(`user:${userId}`);

                console.log(`User joined room: user:${userId}`);
            }

            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id);
            });
        });
    }

    emitNotification(userId: string, notification: Notification): void {

        this.io
            .to(`user:${userId}`)
            .emit("new-notification", notification);
    }

    emitNotificationRead(userId: string, notificationId: string): void {

        this.io
            .to(`user:${userId}`)
            .emit("notification-read", notificationId);
    }

    emitAllNotificationsRead(userId: string): void {

        this.io
            .to(`user:${userId}`)
            .emit("notifications-read-all");
    };

    private get io(): Server {
        return container.resolve<Server>("SocketIOServer");
    }
}