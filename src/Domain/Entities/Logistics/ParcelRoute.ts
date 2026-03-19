export class ParcelRoute {
    constructor(
        public id: string | null,
        public bookingId: string,

        public status: "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "FAILED" = "PLANNED",

        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        this.validate();
    }

    private validate(): void {
        if (!this.bookingId) {
            throw new Error("Booking ID is required");
        }
    }
}
