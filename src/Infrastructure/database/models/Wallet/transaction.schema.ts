import { Schema, model, Types } from "mongoose";

export type TransactionType =
  | "CREDIT"
  | "DEBIT"
  | "HOLD"
  | "RELEASE";

export type TransactionReason =
  | "BOOKING_PAYMENT"
  | "REFUND"
  | "COMMISSION"
  | "SETTLEMENT"
  | "PAYOUT"
  | "ADJUSTMENT";

export type TransactionStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED";

export interface TransactionDocument {
  _id: Types.ObjectId;
  walletId: Types.ObjectId;

  type: TransactionType;
  reason: TransactionReason;
  status: TransactionStatus;

  amount: number;

  orderId?: string;
  payoutId?: string;
  gatewayReferenceId?: string;

  balanceAfter: number;
  metadata?: Record<string, unknown>;

  createdAt: Date;
}

const TransactionSchema = new Schema(
  {
    walletId: { type: Schema.Types.ObjectId, ref: "Wallet", required: true, index: true, },
    type: { type: String, enum: ["CREDIT", "DEBIT", "HOLD", "RELEASE"], required: true, },

    reason: {
      type: String,
      enum: [
        "WALLET_TOPUP",
        "BOOKING_PAYMENT",
        "REFUND",
        "COMMISSION",
        "SETTLEMENT",
        "PAYOUT",
        "ADJUSTMENT",
      ],
      required: true,
      index: true,
    },

    amount: { type: Number, required: true, min: 1, },
    orderId: { type: String, index: true },
    payoutId: { type: String, index: true },

    gatewayReferenceId: { type: String, index: true },
    balanceAfter: { type: Number, required: true, min: 0, },

    status: { type: String, enum: ["PENDING", "SUCCESS", "FAILED"], default: "SUCCESS", },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);


export const TransactionModel = model<TransactionDocument>(
  "WalletTransaction",
  TransactionSchema
);
