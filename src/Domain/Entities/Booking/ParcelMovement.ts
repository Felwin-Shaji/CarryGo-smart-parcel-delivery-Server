export type ParcelMovementStatus =
    | "PENDING"
    | "LOADED"
    | "IN_TRANSIT"
    | "ARRIVED"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED";

export class ParcelMovement {
    constructor(
        public id: string | null,

        public bookingId: string,

        public shipmentId: string | null,
        public segmentId: string | null,

        public fromHubId: string | null,
        public toHubId: string | null,

        public status: ParcelMovementStatus,

        public loadedAt: Date | null = null,
        public unloadedAt: Date | null = null,

        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        this.validate();
    }

    private validate(): void {
        if (!this.bookingId) {
            throw new Error("Booking ID is required");
        }

        if (!this.status) {
            throw new Error("Movement status is required");
        }

    }
}