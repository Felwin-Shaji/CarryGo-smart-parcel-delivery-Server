export type RouteSegmentDTO = {
    id: string
    routeGroupId: string
    originHubId: string
    originHubName: string
    destinationHubId: string
    destinationHubName: string
    segmentOrder: number
    estimatedTimeMinutes: number | null
    distanceKm: number | null
    isActive: boolean
    createdAt: string
    updatedAt: string
    originHubLocation: {
        lat: number;
        lng: number;
    },
    destinationHubLocation: {
        lat: number;
        lng: number;
    }
}


export type RouteGroupDetailDTO = {
    id: string
    agencyId: string
    name: string
    description: string | null
    isActive: boolean
    createdAt: string
    updatedAt: string
    segments: RouteSegmentDTO[]

    totalDistanceKm: number
    totalEstimatedMinutes: number
    activeSegmentCount: number
}

export type CreateRouteSegmentDTO = {
    originHubId: string
    destinationHubId: string
    distanceKm?: number
    estimatedTimeMinutes?: number
    isActive?: boolean
}

export type ReorderSegmentDTO = {
    segmentId: string
    newOrder: number
}