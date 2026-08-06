import { IMessageRepository } from "../../Interfaces/Repositories/Chat/IMessageRepository";
import { IChatRepository } from "../../Interfaces/Repositories/Chat/IChatRepository";
import { ISendMessageUseCase, SendMessageDTO, UIMessage } from "../../Interfaces/UseCases/Chat/ISendMessageUseCase";
import { inject, injectable } from "tsyringe";
import { IGetOrCreateChatUseCase } from "../../Interfaces/UseCases/Chat/IGetOrCreateChatUseCase";
import { IMessageSocketService } from "../../Interfaces/Services/Chat/IMessageSocketService";
import { INotificationService } from "../../Interfaces/Services/Notification/INotificationService";
import { IUserRepository } from "../../Interfaces/Repositories/User/IUserRepository";
import { IAdminRepository } from "../../Interfaces/Repositories/Admin/IAdminRepository";
import { IAgencyRepository } from "../../Interfaces/Repositories/Agency/IAgencyRepository";
import { IHubRepository } from "../../Interfaces/Repositories/Hub/IHubRepository";
import { IHubWorkerRepository } from "../../Interfaces/Repositories/Worker/IHubWorkerRepository";
import { INotificationSocketService } from "../../Interfaces/Services/Notification/INotificationSocketService";
import { AppError } from "../../../Domain/Utils/customError";
import { CHAT_MESSAGE } from "../../../Infrastructure/Constants/Messages/chatMessages";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { Notification } from "../../../Domain/Entities/Notification/Notification";

@injectable()
export class SendMessageUseCase implements ISendMessageUseCase {
    constructor(
        @inject("IMessageRepository") private _messageRepo: IMessageRepository,
        @inject("IChatRepository") private _chatRepo: IChatRepository,
        @inject("IGetOrCreateChatUseCase") private _getOrCreateChat: IGetOrCreateChatUseCase,

        @inject("IMessageSocketService") private _messageSocketService: IMessageSocketService,
        @inject("INotificationService") private readonly _notificationService: INotificationService,
        @inject("INotificationSocketService") private _notificationSocketService: INotificationSocketService,

        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IAdminRepository") private _adminRepo: IAdminRepository,
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
        @inject("IHubRepository") private _hubRepo: IHubRepository,
        @inject("IHubWorkerRepository") private _workerRepo: IHubWorkerRepository,

    ) { }

    async execute(userId: string, role: string, data: SendMessageDTO): Promise<UIMessage> {

        if (userId !== data.senderId) throw new AppError(CHAT_MESSAGE.WRONG_USER, STATUS.BAD_REQUEST)

        let user;
        if (role === "user") user = await this._userRepo.findOne({ _id: userId });
        if (role === "admin") user = await this._adminRepo.findOne({ _id: userId });
        if (role === "agency") user = await this._agencyRepo.findOne({ _id: userId });
        if (role === "hub") user = await this._hubRepo.findOne({ _id: userId });
        if (role === "worker") user = await this._workerRepo.findOne({ _id: userId });

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

        const savedNotification = await this._notifyReceiver(data.receiverId, user?.name ?? 'Sender', data.text);

        this._notificationSocketService.emitNotification(
            data.receiverId,
            savedNotification
        );

        return { ...message, tempId: data.tempId }
    }

    private async _notifyReceiver(receiverId: string, username: string, message: string): Promise<Notification> {
        return await this._notificationService.createNotification(
            receiverId,
            "New Message",
            `${username} sent you a message: ${message}`
        );
    }
}