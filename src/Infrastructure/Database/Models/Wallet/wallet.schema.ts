import { Schema, model, Types } from "mongoose";
import { Role } from "../../../Types/types";


export interface WalletDocument {
  _id: Types.ObjectId;
  ownerType: Role;
  ownerId: Types.ObjectId;

  balance: number;
  lockedBalance: number;  // escrow => hold amount

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const WalletSchema = new Schema<WalletDocument>(
  {
    ownerType: {
      type: String,
      enum: ["user", "agency", "admin", "hub", "worker"],
      required: true,
    },

    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    balance: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    lockedBalance: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

WalletSchema.index(
  { ownerType: 1, ownerId: 1 },
  { unique: true }
);

export const WalletModel = model<WalletDocument>("Wallet", WalletSchema);
