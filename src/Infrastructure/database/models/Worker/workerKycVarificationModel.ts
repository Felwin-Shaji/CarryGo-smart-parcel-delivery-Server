import { Schema, model } from "mongoose";
import { IKYCVerification } from "../../../../Domain/Entities/Worker/WorkerKyc";

const KYCVerificationSchema = new Schema<IKYCVerification>({
    subjectId: { type: String, required: true },
    subjectType: { type: String, enum: ["user", "worker"], required: true },
    idType: { type: String, enum: ["AADHAAR", "DL", "PASSPORT"], required: true, },
    idNumberEncrypted: { type: String, required: true },
    documentUrl: { type: String, required: true },
    selfieUrl: { type: String, required: true },

    status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING", },

    createdAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date, default: null },
});

export const KYCVerificationModel = model<IKYCVerification>(
    "KYCVerification",
    KYCVerificationSchema
);
