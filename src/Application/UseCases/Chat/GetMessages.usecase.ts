import { Message } from "../../../Domain/Entities/Chat/Message";
import { IMessageRepository } from "../../Interfaces/Repositories/Chat/IMessageRepository";
import { IGetMessagesUsecase } from "../../Interfaces/UseCases/Chat/IGetMessagesUsecase";
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