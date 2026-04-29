import { Message } from "@/Domain/Entities/Chat/Message";

export interface IMessageSocketService {
    connect(): void
    emitMessage(chatId: string, message: Message & { tempId: string }): void;
}