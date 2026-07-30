import { container, injectable } from "tsyringe";
import { Server, Socket } from "socket.io";
import { INotificationSocketService } from "../../../Application/interfaces/services_Interfaces/Notification/INotificationSocketService";
import { Notification } from "../../../Domain/Entities/Notification/Notification";
import { TokenService } from "../token.service";
import { AppJwtPayload } from "../../Types/types";


@injectable()
export class NotificationSocketService implements INotificationSocketService {

    constructor(

    ) { }

    connect(): void {
        this.io.on("connection", (socket: Socket) => {
            const { token } = socket.handshake.auth;

            if (!token) {
                socket.disconnect(true);
                return;
            }

            try {
                const tokenService = container.resolve(TokenService);
                const payload = tokenService.verifyAccessToken(token) as AppJwtPayload;

                socket.join(`user:${payload.userId}`);

            } catch (error) {
                console.error("Socket authentication failed:", error);
                socket.disconnect(true);
                return;
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