import { Chat } from "@/Domain/Entities/Chat/Chat";

export interface IGetOrCreateChatUseCase {
    execute(userIds: [string, string], bookingId: string): Promise<Chat>
}