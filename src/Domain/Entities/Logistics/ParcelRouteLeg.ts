export type ParcelRouteLegStatus =
    | "PENDING"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "SKIPPED";

export class ParcelRouteLeg {
    constructor(
        public id: string | null,
        public parcelRouteId: string,

        public segmentId: string,
        public legOrder: number,

        public status: ParcelRouteLegStatus = "PENDING",

        public shipmentId: string | null = null,

        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        this.validate();
    }

    private validate(): void {
        if (!this.parcelRouteId) {
            throw new Error("Parcel route ID is required");
        }

        if (!this.segmentId) {
            throw new Error("Segment ID is required");
        }

        if (this.legOrder <= 0) {
            throw new Error("Leg order must be greater than 0");
        }
    }
}