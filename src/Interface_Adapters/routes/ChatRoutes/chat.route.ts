import { BaseRoute } from "../base.route";
import { asyncHandler } from "../../middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Roles";
import { authenticate } from "../../middlewares/AuthMiddleware/authenticate.middleware";
import { container } from "tsyringe";
import { ChatController } from "../../controllers/Chat/Chat.controller";


export class ChatRoute extends BaseRoute {

    protected initializeRoutes(): void {

        this.router.post(
            "/get-or-create",
            authenticate([Role.USER]),
            asyncHandler((req, res) =>
                container.resolve(ChatController).getOrCreateChat(req, res)
            )
        );

        this.router.post(
            "/messages",
            authenticate([Role.USER]),
            asyncHandler((req, res) =>
                container.resolve(ChatController).sendMesage(req, res)
            )
        );

        this.router.get(
            "/messages/:chatId",
            authenticate([Role.USER]),
            asyncHandler((req, res) =>
                container.resolve(ChatController).getMessage(req, res)
            )
        );
    }
}