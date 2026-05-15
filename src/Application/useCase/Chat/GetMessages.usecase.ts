import { Message } from "../../../Domain/Entities/Chat/Message";
import { IMessageRepository } from "../../interfaces/repositories_interfaces/ChatRepositories_Interfaces/IMessageRepository";
import { IGetMessagesUsecase } from "../../interfaces/useCase_Interfaces/Chat/IGetMessagesUsecase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetMessagesUsecase implements IGetMessagesUsecase {
    constructor(
        @inject("IMessageRepository") private _messageRepo: IMessageRepository
    ) { }

    async execute(chatId: string): Promise<Message[]> {
        return this._messageRepo.findByChatId(chatId);
    }
}