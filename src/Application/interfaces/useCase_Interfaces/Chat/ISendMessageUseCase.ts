import { Message } from "@/Domain/Entities/Chat/Message";

export interface SendMessageDTO {
    senderId: string;
    receiverId: string;
    bookingId: string;
    text: string;
    chatId?: string;
    tempId: string;
}

export interface UIMessage extends Partial<Message> {
    tempId?: string;
    status?: "sending" | "sent" | "failed";
}

export interface ISendMessageUseCase {
    execute(userId: string, role: string, dto: SendMessageDTO): Promise<UIMessage>;
}