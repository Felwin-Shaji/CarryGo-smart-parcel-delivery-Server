import { model, Schema } from "mongoose";
import { AgencyKYC } from "../../../../Domain/Entities/Agency/AgencyKYC";

const agencyKYCModel = new Schema<AgencyKYC>(
    {
        agencyId: { type: Schema.Types.ObjectId, ref: "Agency", required: true },
        tradeLicenseNumber: { type: String, required: true },
        tradeLicenseDocument: { type: String, required: true },
        PANnumber: { type: String, required: true },
        PAN_photo: { type: String, required: true },
        gst_number: { type: String, required: true },
        gst_certificate: { type: String, required: true },
        status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" }
    },
    {
        timestamps: true
    }
);

export const AgencyKYCModel = model<AgencyKYC>("AgencyKYC", agencyKYCModel);
