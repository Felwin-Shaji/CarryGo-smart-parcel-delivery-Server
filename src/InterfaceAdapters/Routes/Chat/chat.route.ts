import { BaseRoute } from "../base.route";
import { asyncHandler } from "../../Middlewares/ErrorHandlers/asyncHandler";
import { Role } from "../../../Domain/Enums/Role";
import { authenticate } from "../../Middlewares/AuthMiddleware/authenticate.middleware";
import { container } from "tsyringe";
import { ChatController } from "../../Controllers/Chat/Chat.controller";


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