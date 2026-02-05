import crypto from "crypto";
import { razorpayClient } from "./razorpay.client";
import { CreateOrderInput, CreateOrderOutput, IPaymentGatewayService } from "../../../Application/interfaces/services_Interfaces/payment/IPaymentGateway";
import { AppError } from "../../../Domain/utils/customError";
import { STATUS } from "../../constants/statusCodes";

export class RazorpayPaymentGateway implements IPaymentGatewayService {

    async createOrder(input: CreateOrderInput): Promise<CreateOrderOutput> {

        try {
            const order = await razorpayClient.orders.create({
                amount: input.amount * 100, // INR → paise
                currency: input.currency,
                receipt: input.receipt,
                payment_capture: true,
                notes:input.notes
            });

            if (!order) throw new AppError("razorepay gatway error",STATUS.GATEWAY_TIMEOUT)

            return {
                orderId: order.id,
                amount: Number(order.amount),
                currency: order.currency,
            };

        } catch (error:any) {
            console.error("Razorpay createOrder error:", error?.error || error);
            throw error;
        }

    }

    verifyPayment(payload: { orderId: string; paymentId: string; signature: string }): boolean {

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(`${payload.orderId}|${payload.paymentId}`)
            .digest("hex");

        return generatedSignature === payload.signature;
    }
}
