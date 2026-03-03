import { model, Schema } from "mongoose";
import { Document, Types } from "mongoose";
import { KYCStatus, Role } from "../../../Types/types";

export interface HubDocument extends Document {
  _id:Types.ObjectId;
  agencyId: Types.ObjectId;

  name: string;
  email: string;
  mobile: string;
  password: string;

  role: Role;

  address: {
    addressLine1: string;
    city: string;
    state: string;
    pincode: string;
  };

  location: {
    type: "Point";
    coordinates: [number, number];
  };

  verificationImage: string;

  kycStatus: KYCStatus;
  rejectReason?: string;

  walletBalance: number;
  isBlocked: boolean;
  tokenVersion: number;

  createdAt: Date;
  updatedAt: Date;
}

const hubSchema = new Schema<HubDocument>(
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
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true
      }
    },

    verificationImage: { type: String, required: true },

    kycStatus: {
      type: String,
      enum: ["PENDING", "REGISTERED", "APPROVED", "REJECTED"],
      default: "PENDING",
      required: true
    },

    rejectReason: { type: String },

    walletBalance: { type: Number, default: 0 },

    isBlocked: { type: Boolean, default: false },
    tokenVersion: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

hubSchema.index({ location: "2dsphere" });

export const HubModel = model<HubDocument>("Hub", hubSchema);
