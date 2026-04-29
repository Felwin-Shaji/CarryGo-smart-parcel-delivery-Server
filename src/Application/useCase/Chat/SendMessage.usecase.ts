import { IMessageRepository } from "@/Application/interfaces/repositories_interfaces/ChatRepositories_Interfaces/IMessageRepository";
import { IChatRepository } from "@/Application/interfaces/repositories_interfaces/ChatRepositories_Interfaces/IChatRepository";
import { Message } from "@/Domain/Entities/Chat/Message";
import { ISendMessageUseCase, SendMessageDTO, UIMessage } from "@/Application/interfaces/useCase_Interfaces/Chat/ISendMessageUseCase";
import { inject, injectable } from "tsyringe";
import { IGetOrCreateChatUseCase } from "@/Application/interfaces/useCase_Interfaces/Chat/IGetOrCreateChatUseCase";
import { AppError } from "@/Domain/utils/customError";
import { CHAT_MESSAGE } from "@/Infrastructure/constants/messages/chatMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { IMessageSocketService } from "@/Application/interfaces/services_Interfaces/Chat/IMessageSocketService";

@injectable()
export class SendMessageUseCase implements ISendMessageUseCase {
    constructor(
        @inject("IMessageRepository") private _messageRepo: IMessageRepository,
        @inject("IChatRepository") private _chatRepo: IChatRepository,
        @inject("IGetOrCreateChatUseCase") private _getOrCreateChat: IGetOrCreateChatUseCase,

        @inject("IMessageSocketService") private _messageSocketService: IMessageSocketService
    ) { }

    async execute(useId: string, data: SendMessageDTO): Promise<UIMessage> {

        if (useId !== data.senderId) throw new AppError(CHAT_MESSAGE.WRONG_USER, STATUS.BAD_REQUEST)

        const chat = await this._getOrCreateChat.execute(
            [data.senderId, data.receiverId],
            data.bookingId
        );

        const message = await this._messageRepo.create({
            chatId: chat.id,
            senderId: data.senderId,
            text: data.text,
        });

        await this._chatRepo.updateLastMessage(chat.id, data.text);

        this._messageSocketService.emitMessage(chat.id, {
            ...message,
            tempId: data.tempId,
        })

        return { ...message, tempId: data.tempId }
    }
}