import { model, Schema } from "mongoose";
import { Hub } from "../../../../Domain/Entities/Hub/Hub";

const hubSchema = new Schema<Hub>(
  {
    agencyId: { type: Schema.Types.ObjectId, ref: "Agency", required: true },

    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["user", "agency", "admin", "hub", "worker"],
      default: "hub",
      required: true
    },

    address: {
      addressLine1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },

    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },

    verificationImage: { type: String, required: true },

    kycStatus: {
      type: String,
      enum: ["PENDING", "REGISTERED", "APPROVED", "REJECTED"],
      default: "PENDING",
      required: true
    },

    walletBalance: { type: Number, default: 0 },

    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const HubModel = model<Hub>("Hub", hubSchema);
