import { Message } from "@/Domain/Entities/Chat/Message";

export interface IGetMessagesUsecase {
    execute(chatId: string): Promise<Message[]>
}