export interface Message {
    id: string;
    chatId: string;
    senderId: string;
    text: string;
    createdAt: Date;
    seen: boolean;
}