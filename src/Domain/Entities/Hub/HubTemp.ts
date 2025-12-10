import { Role } from "../../../Infrastructure/Types/types";

export interface HubTemp {
    _id: string | null;

    agencyId: string;

    name: string;
    email: string;
    mobile: string;
    otp:string;

    role: Role | "hub";

    addressLine1: string | null;
    city: string | null;
    state: string | null;
    pincode: string | null;

    location_lat: number | null;
    location_lng: number | null;
    status?: "BASIC-Info" | "OTP-Verified" ;

    createdAt?: Date;
    updateAt?:Date;
    expiresAt?: Date;
}
