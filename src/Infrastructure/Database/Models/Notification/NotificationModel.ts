import { Document, model, Schema, Types } from "mongoose";

export interface NotificationDocument extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const notificationSchema = new Schema<NotificationDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true, },
        title: { type: String, required: true, },
        message: { type: String, required: true, },
        isRead: { type: Boolean, default: false, index: true, },
    },
    { timestamps: true }
);

export const NotificationModel = model<NotificationDocument>("Notification", notificationSchema);