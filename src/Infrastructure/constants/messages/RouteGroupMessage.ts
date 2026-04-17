
export const ROUTE_GROUP_MESSAGE = {
    ROUTE_GROUP_EXIST: "Route group already existe plase give another name",
    CREATED: "New Coute Group created successfully.",
    LISTED: "Paginated route group.",
    NOTFOUND: "Route group not found",
    ACCESS_DENIED: "Access denied",
    ID_MISSING: "Route group ID is required.",

    DETAIL_FETCHED: "Route group details fetched successfully.",

} as const;

export const ROUTE_SEGMENT_MESSAGE = {
    CREATION_FAILED: "Failed to create RouteSegment",
    NOTFOUND: "Route group not found",
    ACCESS_DENIED: "Access denied",
    DUPLICATE_ERROR: "Duplicate segment orders are not allowed",
    ID_NOTFOUND: "Segment is missing an id",

    CREATED: "Segment added successfully",
    REORDERED: "Segments reordered successfully",
} as const

export const PARCEL_ROUTE_MESSAGE = {
    NOTFOUND: "not found",
    LEGS_NOTFOUND: "No legs found for parcel route",
    CURRENT_LEG_NOTFOUND: "No current leg found for parcel route",
} as const

export const PARCEL_MOVEMENT_MESSAGE = {
    CREATION_FAILED: "Failed to create ParcelMovement"
}

export const SHIPMENT_PARCEL_MESSAGE = {
    NOTFOUND: "Shipment parcel not found",
    BULK_UPDATE_FAILED: "Failed to bulk update shipment parcels",
    INVALID_PARCELS: "One or more parcel IDs are invalid for the given shipment",
    INVALID_FLOW: "One or more parcels cannot be updated to the requested status due to invalid status flow",
    IDs_MISSING:"parcel Id , booking Id, booking tracking Id missing"
} as const

export const HUB_SHIPMENT_MESSAGE = {
    FROM_HUB_ID_NOT_FOUND: "fromHubId is required to create pickup shipment",
    TO_HUB_ID_NOT_FOUND: "toHubId is required to create pickup shipment",
} as const;