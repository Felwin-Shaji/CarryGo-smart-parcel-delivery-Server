export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}