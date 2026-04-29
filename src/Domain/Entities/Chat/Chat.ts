export interface Chat {
    id: string;
    bookingId: string;
    participants: string[];
    lastMessage?: string;
    updatedAt: Date;
}