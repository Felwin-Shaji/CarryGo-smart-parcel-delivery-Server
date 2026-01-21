import { Schema, model, Types } from "mongoose";

export type WalletTransactionType = "CREDIT" | "DEBIT";
export type WalletTransactionReason =
  | "BOOKING_PAYMENT"
  | "REFUND"
  | "COMMISSION"
  | "SETTLEMENT"
  | "PAYOUT"
  | "ADJUSTMENT";

export interface WalletTransactionDocument {
  _id: Types.ObjectId;
  walletId: Types.ObjectId;

  type: WalletTransactionType;
  reason: WalletTransactionReason;

  amount: number;

  referenceId: string; 
  metadata?: Record<string, any>;

  createdAt: Date;
}

const WalletTransactionSchema = new Schema<WalletTransactionDocument>(
  {
    walletId: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["CREDIT", "DEBIT"],
      required: true,
    },

    reason: {
      type: String,
      enum: [
        "BOOKING_PAYMENT",
        "REFUND",
        "COMMISSION",
        "SETTLEMENT",
        "PAYOUT",
        "ADJUSTMENT",
      ],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    referenceId: {
      type: String,
      required: true,
      index: true,
    },

    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const WalletTransactionModel = model<WalletTransactionDocument>(
  "WalletTransaction",
  WalletTransactionSchema
);
