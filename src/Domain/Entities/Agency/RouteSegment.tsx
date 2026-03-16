export class RouteSegment {
    constructor(
        public id: string | null,
        public routeGroupId: string,

        public originHubId: string,
        public destinationHubId: string,
        public segmentOrder: number,

        public estimatedTimeMinutes: number | null = null,
        public distanceKm: number | null = null,

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