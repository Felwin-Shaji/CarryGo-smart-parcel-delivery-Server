export type RazorpayPayoutMode =
  | "IMPS"
  | "NEFT"
  | "RTGS"
  | "UPI"
  | "IFT";

export type RazorpayPayoutPurpose =
  | "payout"
  | "refund"
  | "cashback"
  | "commission"
  | "salary"
  | "vendor_payment";

export interface RazorpayCreatePayoutRequest {
  account_number: string;
  fund_account_id: string;
  amount: number;
  currency: "INR";
  mode: RazorpayPayoutMode;
  purpose: RazorpayPayoutPurpose;
  queue_if_low_balance?: boolean;
  notes?: Record<string, string>;
}

export interface RazorpayCreatePayoutResponse {
  id: string;
  entity: "payout";
  amount: number;
  currency: string;
  status:
    | "queued"
    | "pending"
    | "processing"
    | "processed"
    | "reversed"
    | "failed";
  fund_account_id: string;
  created_at: number;
}
