/**
 * RouteSegment — Single Hub-to-Hub Hop
 *
 * Represents one leg of a RouteGroup corridor.
 * Each segment defines a direct connection between
 * two hubs — where the truck comes from and where it goes next.
 *
 * Think of it like a bus stop sequence:
 *   Stop 1: Mumbai  → Nagpur    (segmentOrder: 1)
 *   Stop 2: Nagpur  → Delhi     (segmentOrder: 2)
 *
 * Segments from DIFFERENT RouteGroups can be combined
 * to plan a parcel's full journey via ParcelRouteLeg.
 *
 * Example — parcel going Mumbai → Delhi → Chandigarh:
 *   ParcelRouteLeg 1 → RouteSegment (Mumbai → Delhi)   [RouteGroup 1]
 *   ParcelRouteLeg 2 → RouteSegment (Delhi → Chandigarh) [RouteGroup 2]
 *
 * Relationships:
 *   - belongs to one RouteGroup (routeGroupId)
 *   - referenced by HubShipment (the actual truck dispatch)
 *   - referenced by ParcelRouteLeg (the parcel's planned hop)
 *   - referenced by ParcelMovement (the parcel's actual hop)
 *
 * Validations:
 *   - segmentOrder must be > 0
 *   - origin and destination hubs cannot be the same hub
 */
export class RouteSegment {
    constructor(
        /** Primary key. Null until persisted. */
        public id: string | null,

        public agencyId: string,

        /** The RouteGroup (corridor) this segment belongs to. */
        public routeGroupId: string,

        /** The hub this segment departs from. */
        public originHubId: string,

        /** The hub this segment arrives at. */
        public destinationHubId: string,

        /**
         * Position of this hop within the corridor.
         * Must be > 0. Lower number = earlier in the route.
         * E.g. Mumbai→Nagpur is order 1, Nagpur→Delhi is order 2.
         *
         * Note: this is the order within the RouteGroup only.
         * For a parcel's cross-corridor order, see ParcelRouteLeg.legOrder.
         */
        public segmentOrder: number,

        /** How long this hop typically takes. Used for ETA calculation. */
        public estimatedTimeMinutes: number | null = null,

        /** Physical distance of this hop. Used for pricing. */
        public distanceKm: number | null = null,

        /**
         * Use this to temporarily disable a hub connection
         * without deleting the segment.
         */
        public isActive: boolean = true,

        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        this.validate();
    }

    private validate(): void {
        if (this.segmentOrder <= 0) {
            throw new Error("Segment order must be greater than 0");
        }

        if (this.originHubId === this.destinationHubId) {
            throw new Error("Origin and destination hubs cannot be the same");
        }
    }
}