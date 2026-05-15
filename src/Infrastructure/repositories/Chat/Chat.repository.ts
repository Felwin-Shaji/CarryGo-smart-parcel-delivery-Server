import { Types } from "mongoose";
import { IChatRepository } from "../../../Application/interfaces/repositories_interfaces/ChatRepositories_Interfaces/IChatRepository";
import { Chat } from "../../../Domain/Entities/Chat/Chat";
import { ChatDocument, ChatModel } from "../../database/models/Chat/chatModel";

export class ChatRepository implements IChatRepository {

    async create(chat: Partial<Chat>): Promise<Chat> {
        const created = await ChatModel.create({
            participants: chat.participants?.map(
                (id) => new Types.ObjectId(id)
            ),
            bookingId: new Types.ObjectId(chat.bookingId),
            lastMessage: chat.lastMessage,
        });

        return this.toDomain(created);
    }

    async findByParticipants(userIds: string[], bookingId: string): Promise<Chat | null> {
        const objectIds = userIds.map((id) => new Types.ObjectId(id));

        const chat = await ChatModel.findOne({
            participants: { $all: objectIds, $size: objectIds.length },
            bookingId
        });

        return chat ? this.toDomain(chat) : null;
    }

    async updateLastMessage(chatId: string, lastMessage: string): Promise<void> {
        await ChatModel.findByIdAndUpdate(chatId, {
            lastMessage,
            updatedAt: new Date(),
        });
    }

    private toDomain = (doc: ChatDocument): Chat => {
        const chat: Chat = {
            id: doc._id.toString(),
            bookingId: doc.bookingId.toString(),
            participants: doc.participants.map((id) => id.toString()),
            updatedAt: doc.updatedAt,
        };

        if (doc.lastMessage !== undefined) {
            chat.lastMessage = doc.lastMessage;
        }

        return chat;
    };
}