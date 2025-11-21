import { Types } from "mongoose";

export interface Hub {
    id?: string;
    agencyId: Types.ObjectId;
    name: string;
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
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt?: Date;
    updatedAt?: Date;
};
