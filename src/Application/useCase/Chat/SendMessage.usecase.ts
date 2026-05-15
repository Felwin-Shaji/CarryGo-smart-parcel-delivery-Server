import { IMessageRepository } from "../../interfaces/repositories_interfaces/ChatRepositories_Interfaces/IMessageRepository";
import { IChatRepository } from "../../interfaces/repositories_interfaces/ChatRepositories_Interfaces/IChatRepository";
import { ISendMessageUseCase, SendMessageDTO, UIMessage } from "../../interfaces/useCase_Interfaces/Chat/ISendMessageUseCase";
import { inject, injectable } from "tsyringe";
import { IGetOrCreateChatUseCase } from "../../interfaces/useCase_Interfaces/Chat/IGetOrCreateChatUseCase";
import { IMessageSocketService } from "../../interfaces/services_Interfaces/Chat/IMessageSocketService";
import { INotificationService } from "../../interfaces/services_Interfaces/Notification/INotificationService";
import { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { IAdminRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/admin.repository";
import { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { IHubRepository } from "../../interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { IHubWorkerRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { INotificationSocketService } from "../../interfaces/services_Interfaces/Notification/INotificationSocketService";
import { AppError } from "../../../Domain/utils/customError";
import { CHAT_MESSAGE } from "../../../Infrastructure/constants/messages/chatMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
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