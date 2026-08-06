import { BaseRoute } from "../BaseRoute";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Role";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate";
import { container } from "tsyringe";
import { NotificationController } from "../../Controllers/Notification/NotificationController";

export class NotificationRoute extends BaseRoute {
    protected initializeRoutes(): void {

        this.router.get(
            "/notifications",
            authenticate([Role.USER, Role.ADMIN, Role.AGENCY, Role.HUB, Role.WORKER]),
            asyncHandler((req, res) =>
                container.resolve(NotificationController).getNotifications(req, res)
            )
        );

        this.router.get(
            "/notifications/unread-count",
            authenticate([Role.USER, Role.ADMIN, Role.AGENCY, Role.HUB, Role.WORKER]),
            asyncHandler((req, res) =>
                container.resolve(NotificationController).getUnreadCount(req, res)
            )
        );

        this.router.patch(
            "/notifications/read/:id",
            authenticate([Role.USER, Role.ADMIN, Role.AGENCY, Role.HUB, Role.WORKER]),
            asyncHandler((req, res) =>
                container.resolve(NotificationController).markAsRead(req, res)
            )
        );

        this.router.patch(
            "/notifications/read-all",
            authenticate([Role.USER, Role.ADMIN, Role.AGENCY, Role.HUB, Role.WORKER]),
            asyncHandler((req, res) =>
                container.resolve(NotificationController).markAllAsRead(req, res)
            )
        );
    }
}