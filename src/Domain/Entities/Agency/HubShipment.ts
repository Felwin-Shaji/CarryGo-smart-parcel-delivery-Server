export type ShipmentType =
    | "HUB_TRANSFER"
    | "OUT_FOR_DELIVERY"
    | "BULK_PICKUP";

export type ShipmentStatus =
    | "PENDING"
    | "LOADING"
    | "DISPATCHED"
    | "ARRIVED"
    | "COMPLETED"
    | "CANCELLED";

export class HubShipment {
    constructor(
        public id: string | null,
        public segmentId: string | null,

        public type: ShipmentType,
        public fromHubId: string | null,
        public toHubId: string | null,
        public assignedWorkerId: string | null,

        public vehicleNumber: string | null,

        public capacity: number | null = null,
        public parcelCount: number = 0,

        public status: ShipmentStatus = "PENDING",

        public departedAt: Date | null = null,
        public arrivedAt: Date | null = null,

        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        this.validate();
    };

    private validate(): void {
        if (this.capacity !== null && this.capacity < 0) {
            throw new Error("Shipment capacity cannot be negative");
        }

        if (this.parcelCount < 0) {
            throw new Error("Parcel count cannot be negative");
        }

    }
}