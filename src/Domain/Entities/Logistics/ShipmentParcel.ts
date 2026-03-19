export type ShipmentParcelStatus =
    | "LOADED"
    | "IN_TRANSIT"
    | "UNLOADED";

export class ShipmentParcel {
    constructor(
        public id: string | null,

        public shipmentId: string,

        public bookingId: string,

        public status: ShipmentParcelStatus = "LOADED",

        public loadedAt: Date = new Date(),
        public unloadedAt: Date | null = null,

        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) { 
        this.validate() 
    }

    private validate(): void {
        if (!this.shipmentId) {
            throw new Error("Shipment ID is required");
        }

        if (!this.bookingId) {
            throw new Error("Booking ID is required");
        }

    }
}