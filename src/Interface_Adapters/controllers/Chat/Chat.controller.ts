import { Request, Response } from "express";
import { IGetOrCreateChatUseCase } from "@/Application/interfaces/useCase_Interfaces/Chat/IGetOrCreateChatUseCase";
import { inject, injectable } from "tsyringe";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { ApiResponse } from "@/Interface_Adapters/presenters/ApiResponse";
import { CHAT_MESSAGE } from "@/Infrastructure/constants/messages/chatMessage";
import { ISendMessageUseCase, SendMessageDTO } from "@/Application/interfaces/useCase_Interfaces/Chat/ISendMessageUseCase";
import { AppError } from "@/Domain/utils/customError";
import { AUTH_MESSAGES } from "@/Infrastructure/constants/messages/authMessages";
import { IGetMessagesUsecase } from "@/Application/interfaces/useCase_Interfaces/Chat/IGetMessagesUsecase";

@injectable()
export class ChatController {
    constructor(
        @inject("IGetOrCreateChatUseCase") private _getOrCreateChatUseCase: IGetOrCreateChatUseCase,
        @inject("ISendMessageUseCase") private _sendMessageUseCase: ISendMessageUseCase,
        @inject("IGetMessagesUsecase") private _getMessagesUsecase: IGetMessagesUsecase,
    ) { };

    getOrCreateChat = async (req: Request, res: Response) => {
        const { userIds, bookingId } = req.body as { userIds: [string, string], bookingId: string };

        const chat = await this._getOrCreateChatUseCase.execute(userIds, bookingId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                CHAT_MESSAGE.GET_CHAT_ID,
                chat.id
            )
        )
    }

    sendMesage = async (req: Request, res: Response) => {
        const dto = req.body as SendMessageDTO

        const userId = req.user?.id;
        if (!userId) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS.NOT_FOUND)

        const message = await this._sendMessageUseCase.execute(userId, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                CHAT_MESSAGE.MESSAGE_SENDED,
                message
            )
        )
    };

    getMessage = async (req: Request, res: Response) => {
        const { chatId } = req.params as { chatId: string };

        const messages = await this._getMessagesUsecase.execute(chatId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                CHAT_MESSAGE.FETCHED,
                messages
            )
        )
    }
}