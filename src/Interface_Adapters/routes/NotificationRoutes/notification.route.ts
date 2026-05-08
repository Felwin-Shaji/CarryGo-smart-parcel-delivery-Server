import { BaseRoute } from "../base.route";
import { asyncHandler } from "@/Interface_Adapters/middlewares/ErrorHandlers/asyncHandler";
import { Role } from "@/Domain/Enums/Roles";
import { authenticate } from "@/Interface_Adapters/middlewares/AuthMiddleware/authenticate.middleware";
import { container } from "tsyringe";
import { NotificationController } from "@/Interface_Adapters/controllers/Notification/Notification.controller";

export class NotificationRoute extends BaseRoute {
    protected initializeRoutes(): void {

        this.router.get(
            "/",
            authenticate([Role.USER]),
            asyncHandler((req, res) =>
                container.resolve(NotificationController).getNotifications(req, res)
            )
        );

        this.router.get(
            "/unread-count",
            authenticate([Role.USER]),
            asyncHandler((req, res) =>
                container.resolve(NotificationController).getUnreadCount(req, res)
            )
        );

        this.router.patch(
            "/read/:id",
            authenticate([Role.USER]),
            asyncHandler((req, res) =>
                container.resolve(NotificationController).markAsRead(req, res)
            )
        );

        this.router.patch(
            "/read-all",
            authenticate([Role.USER]),
            asyncHandler((req, res) =>
                container.resolve(NotificationController).markAllAsRead(req, res)
            )
        );
    }
}