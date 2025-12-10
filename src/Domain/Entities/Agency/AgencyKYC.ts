import { Types } from "mongoose";

export interface AgencyKYC  {
    _id?: string;
    agencyId: Types.ObjectId;
    tradeLicenseNumber: string;
    tradeLicenseDocument: string;  
    PANnumber: string;
    PAN_photo: string;             
    gst_number: string;
    gst_certificate: string;        
    status: "PENDING" | "APPROVED" | "REJECTED" | "RESUBMITTED";
    createdAt?: Date;
    updatedAt?: Date;
}