export interface AdminDashboardResponseDTO {
    overview: {
        totalUsers: number;
        totalTravelers: number;
        totalAgencies: number;
        totalHubs: number;
        totalWorkers: number;

        activeParcels: number;
        deliveredParcels: number;

        platformRevenue: number;
        travelerCommission: number;
        agencyCommission: number;
    };
};

export interface AdminRevenueChartResponseDTO {
    data: {
        label: string;
        revenue: number;
    }[];
};

export interface AdminBookingChartResponseDTO {
    data: {
        label: string;
        bookings: number;
        delivered: number;
    }[];
};

export interface AdminBookingsReportResponseDTO {
    bookings: {
        bookingId: string;

        user: string;

        deliveryType: string;

        partnerName: string;

        pickupCity: string;
        deliveryCity: string;

        totalAmount: number;

        platformCommission: number;
        travelerCommission: number;
        agencyCommission: number;

        status: string;

        createdAt: Date;
    }[];

    totalPages: number;
    currentPage: number;
    totalCount: number;
};


export interface GetAdminDashboardDTO {
    fromDate?: string;
    toDate?: string;
};

export interface AdminBookingsReportDTO extends GetAdminDashboardDTO {
    page?: string;

    limit?: string;

    deliveryType?: string;

    status?: string;
};

export interface ExportAdminBookingsReportDTO {
    type?: "excel" | "pdf";
    fromDate?: string;
    toDate?: string;
    deliveryType?: string;
    status?: string;
};

export interface ExportAdminBookingsReportResponseDTO {
    file: Buffer;
    mimeType: string;
    fileName: string;
};