
export type Role = "user" | "agency" | "admin" | "hub" | "worker";

export type KYCStatus = "PENDING" | "REGISTERED" | "APPROVED" | "REJECTED" | "RESUBMITTED";

export interface AppJwtPayload {
    userId: string;
    email: string;
    role: Role;
    tokenVersion:number;
}

export interface PincodeDetails {
    pincode: string;
    city: string;
    state: string;
    district: string;
}

export interface AuthUserDTO {
    id: string;
    name: string;
    email: string;
    role: Role;
    kycStatus: KYCStatus;
    tokenVersion: number;
}

export interface TokenObj {
    accessToken: string;
    refreshToken: string;
    user?: AuthUserDTO;
}


export type BookingStatusType =
    | "CREATED"
    | "PAYMENT_PENDING"
    | "PAID_PENDING_PICKUP"
    | "PICKUP_STARTED"
    | "IN_TRANSIT"
    | "DELIVERED"
    | "CANCELLED_BEFORE_PICKUP"
    | "CANCELLED_AFTER_PICKUP"
    | "REFUNDED"
    | "SETTLED";


export type PaymentStatusType =
    | "NOT_INITIATED"
    | "ORDER_CREATED"
    | "PAID"
    | "FAILED"
    | "REFUNDED";


export type PackageSizeType = "SMALL" | "MEDIUM" | "LARGE";


export type DeliveryPartnerType = "AGENCY" | "TRAVELER";


export type HubJourneyStatusType =  "PENDING" | "RECEIVED" | "DISPATCHED";

export type AddressLabelType = "Home" | "Office" | "Warehouse" | "Other";

export type PaymentMethodType = "CARD" | "UPI" | "NETBANKING" | "WALLET";

export type PaymentGatewayType = "RAZORPAY" ;
