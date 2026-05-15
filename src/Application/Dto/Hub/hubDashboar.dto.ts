import { HubShipment, ShipmentStatus } from "../../../Domain/Entities/Logistics/HubShipment";

/**
 * GET /hub/dashboard/summary
 */
export interface GetHubDashboardSummaryResponseDTO {
    shipments: {
        total: number;
        pending: number;
        active: number;
        arrived: number;
        completed: number;
        cancelled: number;
    };

    workers: {
        total: number;
        blocked: number;
        kyc: {
            pending: number;
            approved: number;
            rejected: number;
        };
    };
};

export type ShipmentSummaryGroup = {
    _id: ShipmentStatus;
    count: number;
};

/**
 * GET /hub/dashboard/trend
 */

export interface GetHubDashboardTrendRequestDTO {
    from?: string;
    to?: string;
};

export interface HubShipmentTrendItemDTO {
    date: string;
    count: number;
};

export interface GetHubDashboardTrendResponseDTO {
    trend: HubShipmentTrendItemDTO[];
};

/**
 * GET /hub/dashboard/types
 */
export interface GetHubDashboardTypesResponseDTO {
    hubTransfer: number;
    outForDelivery: number;
    bulkPickup: number;
};

/**
 * GET /hub/dashboard/shipments-preview
 */

export interface GetHubDashboardShipmentsPreviewResponseDTO {
    recentShipments: HubShipment[];
    unassignedShipments: HubShipment[];
}