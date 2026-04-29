import { Document, model, Schema, Types } from "mongoose";

export interface ChatDocument extends Document {
    _id: Types.ObjectId;

    bookingId: Types.ObjectId;

    participants: Types.ObjectId[];

    lastMessage?: string;

    updatedAt: Date;
    createdAt: Date;
}

const chatSchema = new Schema<ChatDocument>(
    {
        bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true, index: true },
        participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true, },],

        lastMessage: String,
    },
    { timestamps: true }
);

export const ChatModel = model<ChatDocument>("Chat", chatSchema);