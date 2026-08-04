import Razorpay from "razorpay";
import { RazorpayCreatePayoutRequest, RazorpayCreatePayoutResponse } from "../../Types/razorpayX.types";


interface RazorpayXExtension {
  payouts: {
    create(
      data: RazorpayCreatePayoutRequest
    ): Promise<RazorpayCreatePayoutResponse>;
  };
}

export const razorpayClient = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
}) as Razorpay & RazorpayXExtension;
