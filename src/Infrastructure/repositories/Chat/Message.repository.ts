
import { IMessageRepository } from "../../../Application/interfaces/repositories_interfaces/ChatRepositories_Interfaces/IMessageRepository";
import { Message } from "../../../Domain/Entities/Chat/Message";
import { Types } from "mongoose";
import { MessageDocument, MessageModel } from "../../database/models/Chat/messageModel";

export class MessageRepository implements IMessageRepository {

    async create(message: Partial<Message>): Promise<Message> {
        const created = await MessageModel.create({
            chatId: new Types.ObjectId(message.chatId),
            senderId: new Types.ObjectId(message.senderId),
            text: message.text,
            seen: message.seen ?? false,
        });

        return this.toDomain(created);
    }

    async findByChatId(chatId: string): Promise<Message[]> {
        const messages = await MessageModel
            .find({ chatId: new Types.ObjectId(chatId) })
            .sort({ createdAt: 1 });

        return messages.map(this.toDomain);
    }
    

    private toDomain = (doc: MessageDocument): Message => ({
        id: doc._id.toString(),
        chatId: doc.chatId.toString(),
        senderId: doc.senderId.toString(),
        text: doc.text,
        seen: doc.seen,
        createdAt: doc.createdAt,
    });

}