/**
 * RouteGroup — Linehaul Corridor Definition
 *
 * Represents a fixed truck corridor operated by an agency.
 * A RouteGroup is the "named route" — e.g. "Mumbai–Delhi Express".
 * It has no geographic data itself; the actual hub-to-hub hops
 * are defined by its child RouteSegments.
 *
 * One RouteGroup = one truck that travels through multiple hubs
 * in a fixed sequence.
 *
 * Relationships:
 *   - belongs to one Agency (agencyId)
 *   - has many RouteSegments (one per hub hop)
 *   - RouteSegments from different RouteGroups can be
 *     stitched together via ParcelRouteLeg to form
 *     a cross-corridor parcel journey
 *
 * Example:
 *   RouteGroup: "Mumbai–Delhi Express"
 *     └── Segment 1: Mumbai → Nagpur
 *     └── Segment 2: Nagpur → Delhi
 */
export class RouteGroup {
    constructor(
        /** Primary key. Null until persisted. */
        public id: string | null,

        /** The agency that owns and operates this corridor. */
        public agencyId: string,

        /** Human-readable corridor name. E.g. "Mumbai–Delhi Express" */
        public name: string,

        /** Optional notes about this corridor. */
        public description: string | null = null,

        /** Inactive corridors are excluded from route planning. */
        public isActive: boolean = true,

        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) { }
}