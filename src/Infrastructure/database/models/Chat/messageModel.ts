import { Document, model, Schema, Types } from "mongoose";

export interface MessageDocument extends Document {
    _id: Types.ObjectId;

    chatId: Types.ObjectId;
    senderId: Types.ObjectId;

    text: string;

    seen: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<MessageDocument>(
    {
        chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true, index: true, },

        senderId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true, },

        text: { type: String, required: true, },

        seen: { type: Boolean, default: false, },
    },
    { timestamps: true }
);

export const MessageModel = model<MessageDocument>(
    "Message",
    messageSchema
);