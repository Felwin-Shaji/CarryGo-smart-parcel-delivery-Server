export interface GetHubsDTO {
    page: number;
    limit: number;
    search: string;
    sortBy: string;
    sortOrder: "desc" | "asc";
    blocked?: boolean | null;
    kycStatus?: string;
    startDate?: string;
    endDate?: string;
};

export interface HubResponseDTO {
    id: string;
    name: string;
    email: string;
    mobile: string;
    isBlocked: boolean;
    kycStatus: string;
    createdAt: Date;
};

export interface GetHubsResponseDTO {
    data: HubResponseDTO[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};