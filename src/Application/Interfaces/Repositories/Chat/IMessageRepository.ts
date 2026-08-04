import { Message } from "../../../../Domain/Entities/Chat/Message";

export interface IMessageRepository {
    create(message: Partial<Message>): Promise<Message>;

    findByChatId(chatId: string): Promise<Message[]>;
}