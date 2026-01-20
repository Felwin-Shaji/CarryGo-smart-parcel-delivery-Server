import { KYCStatus } from "../../../Infrastructure/Types/types";
import { GetHubWorkersResponseDTO  } from "../Workers/worker.dto";

export interface HubOverviewResponseDTO {
    id: string;
    agencyId: string;

    name: string;
    email: string;
    mobile: string;

    role: "hub";

    address: {
        addressLine1: string;
        city: string;
        state: string;
        pincode: string;
    };

    location: {
        lat: number;
        lng: number;
    };

    verificationImage: string;
    kycStatus: KYCStatus;
    walletBalance: number;
    isBlocked: boolean;

    createdAt: Date;
}




/**
 * Hub overview with workers & worker KYC
 */
export interface GetHubOverviewResponseDTO {
    hub: HubOverviewResponseDTO;
    workers: GetHubWorkersResponseDTO;
}