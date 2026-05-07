import { Types } from "mongoose";

// GET /agency/dashboard
export interface AlertDTO {
    type: "PRICING_OUTDATED";
    message: string;
}

export interface AgencyDashboardResponseDTO {
    alerts: AlertDTO[];

    stats: {
        totalHubs: number;
        totalWorkers: number;
        totalRevenue: number; // from SETTLEMENT
        totalCompletedBookings: number; // Booking.status = DELIVERED
    };
};


// GET /agency/dashboard/sales-chart?range=7d
export interface SalesChartRequestDTO {
    fromDate?: string; // ISO string
    toDate?: string;   // ISO string
};

export type DateFilter = {
    $gte?: Date;
    $lte?: Date;
};

export type SettlementMatch = {
    walletId: Types.ObjectId;
    type: "CREDIT";
    reason: "SETTLEMENT";
    status: "SUCCESS";
    createdAt?: DateFilter;
};

export interface SalesChartResponseDTO {
    data: {
        date: string; // ISO or formatted
        revenue: number;
    }[];
}

// GET /agency/dashboard/deliveries-chart?range=7d
export interface DeliveriesChartRequestDTO {
    fromDate?: string;
    toDate?: string;
}

export interface DeliveriesChartResponseDTO {
    data: {
        date: string;
        count: number;
    }[];
};

// GET /agency/dashboard/sales-report
export interface SalesReportRequestDTO {
    fromDate?: string; // ISO
    toDate?: string;   // ISO

    page?: number;
    limit?: number;
};

export type DateRangeFilter = {
    $gte?: Date;
    $lte?: Date;
};

export type GetSettlementReportQuery = {
    fromDate?: string;
    toDate?: string;
    page: number;
    limit: number;
};

export interface SalesReportResponseDTO {
    data: SalesReportRowDTO[];

    summary: {
        totalRevenue: number;
        totalBookings: number;
    };

    pagination: {
        page: number;
        limit: number;
        total: number;
    };
};

export interface SalesReportRowDTO {
    date: string;

    bookingId: string;

    grossAmount: number;

    commission?: number;

    netAmount: number;

    paymentStatus: string;

};


export interface ExportSalesReportDTO {
    type?: "excel" | "pdf";
    fromDate?: string;
    toDate?: string;
}

export interface ExportSalesReportResponseDTO {
    file: Uint8Array;
    mimeType: string;
    fileName: string;
}


