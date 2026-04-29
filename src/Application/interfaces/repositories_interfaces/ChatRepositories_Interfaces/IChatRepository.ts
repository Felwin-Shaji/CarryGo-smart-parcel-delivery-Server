import { Chat } from "@/Domain/Entities/Chat/Chat";

export interface IChatRepository {
    create(chat: Partial<Chat>): Promise<Chat>;
    findByParticipants(userIds: string[], bookingId: string): Promise<Chat | null>;
    updateLastMessage(chatId: string, lastMessage: string): Promise<void>;
}