import crypto from "crypto";
import { razorpayClient } from "./razorpay.client";
import { CreateOrderInput, CreateOrderOutput, IPaymentGatewayService } from "../../../Application/interfaces/services_Interfaces/payment/IPaymentGateway";

export class RazorpayPaymentGateway implements IPaymentGatewayService {

    async createOrder(input: CreateOrderInput): Promise<CreateOrderOutput> {

        const order = await razorpayClient.orders.create({
            amount: input.amount * 100, // INR → paise
            currency: input.currency,
            receipt: input.receipt,
            payment_capture: true,
        });

        return {
            orderId: order.id,
            amount: Number(order.amount),
            currency: order.currency,
        };
    }

    verifyPayment(payload: { orderId: string; paymentId: string; signature: string }): boolean {

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(`${payload.orderId}|${payload.paymentId}`)
            .digest("hex");

        return generatedSignature === payload.signature;
    }
}
