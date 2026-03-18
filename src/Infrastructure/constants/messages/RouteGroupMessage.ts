import { NOTFOUND } from "dns";

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