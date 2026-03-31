/**
 * ShipmentType — What kind of dispatch this is
 *
 * HUB_TRANSFER    — Truck moving parcels between two hubs
 *                   along a RouteSegment. The core linehaul operation.
 *
 * OUT_FOR_DELIVERY — Last-mile delivery van going from a hub
 *                   to the recipient's address. No segmentId needed.
 *
 * BULK_PICKUP      — Collection vehicle picking up parcels
 *                   from senders and bringing them to the origin hub.
 *                   First-mile operation. No segmentId needed.
 */
export type ShipmentType =
    | "HUB_TRANSFER"
    | "OUT_FOR_DELIVERY"
    | "BULK_PICKUP";

/**
 * ShipmentStatus — Lifecycle of a single dispatch
 *
 * PENDING    → Shipment created, not yet being loaded
 * LOADING    → Hub staff are loading parcels onto the vehicle
 * DISPATCHED → Vehicle has left the origin hub
 * ARRIVED    → Vehicle has reached the destination hub
 * COMPLETED  → All parcels unloaded and accounted for
 * CANCELLED  → Shipment was cancelled before dispatch
 */
export type ShipmentStatus =
    | "PENDING"
    | "LOADING"
    | "DISPATCHED"
    | "ARRIVED"
    | "COMPLETED"
    | "CANCELLED";

/**
 * HubShipment — One Physical Vehicle Dispatch
 *
 * Represents a single truck or van run. One shipment carries
 * many parcels at once between two points.
 *
 * There are three kinds of shipment (see ShipmentType):
 *   1. Hub-to-hub linehaul transfer   (HUB_TRANSFER)
 *   2. Last mile to recipient          (OUT_FOR_DELIVERY)
 *   3. First mile from sender          (BULK_PICKUP)
 *
 * For HUB_TRANSFER, segmentId must point to a RouteSegment.
 * For OUT_FOR_DELIVERY and BULK_PICKUP, segmentId is null
 * because these runs are not part of the linehaul corridor.
 *
 * Lifecycle:
 *   PENDING → LOADING → DISPATCHED → ARRIVED → COMPLETED
 *                                            ↘ CANCELLED (at any point before DISPATCHED)
 *
 * Relationships:
 *   - linked to one RouteSegment (segmentId) — HUB_TRANSFER only
 *   - has many ShipmentParcels (the manifest)
 *   - has many ParcelMovements (the audit trail)
 *   - assigned to one Worker (assignedWorkerId)
 *   - referenced by ParcelRouteLeg (shipmentId filled when truck assigned)
 *
 * Validations:
 *   - capacity cannot be negative
 *   - parcelCount cannot be negative
 */
export class HubShipment {
    constructor(
        /** Primary key. Null until persisted. */
        public id: string | null,

        /**
         * The RouteSegment this shipment runs on.
         * Only set for HUB_TRANSFER type.
         * Null for OUT_FOR_DELIVERY and BULK_PICKUP.
         */
        public segmentId: string | null,

        /** What kind of dispatch this is. See ShipmentType. */
        public type: ShipmentType,

        /** Hub this shipment departs from. Null for BULK_PICKUP from sender. */
        public fromHubId: string | null,

        /** Hub or address this shipment is heading to. */
        public toHubId: string | null,

        /** The worker (driver) assigned to this run. */
        public assignedWorkerId: string | null,

        /** Vehicle plate number for tracking and accountability. */
        public vehicleNumber: string | null,

        /**
         * Maximum number of parcels this vehicle can carry.
         * Null means no cap enforced.
         */
        public capacity: number | null = null,

        /** Current number of parcels loaded on this shipment. */
        public parcelCount: number = 0,

        /** Current stage in the dispatch lifecycle. */
        public status: ShipmentStatus = "PENDING",

        /**To set the estimate time of start jerny */
        public estimatedDispatchAt: Date | null = null,

        /** When the vehicle left the origin hub. Set on DISPATCHED. */
        public departedAt: Date | null = null,

        /** When the vehicle reached the destination. Set on ARRIVED. */
        public arrivedAt: Date | null = null,

        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        this.validate();
    }

    private validate(): void {
        if (this.capacity !== null && this.capacity < 0) {
            throw new Error("Shipment capacity cannot be negative");
        }

        if (this.parcelCount < 0) {
            throw new Error("Parcel count cannot be negative");
        }
    }
}