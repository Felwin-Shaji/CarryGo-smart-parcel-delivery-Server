import { BaseRoute } from "../base.route";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Roles";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { container } from "tsyringe";
import { NotificationController } from "../../controllers/Notification/Notification.controller";

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