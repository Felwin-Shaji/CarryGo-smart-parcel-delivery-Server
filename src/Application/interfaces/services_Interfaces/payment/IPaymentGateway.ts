export type CreateOrderInput = {
    amount: number;        // in INR
    currency: "INR";
    receipt: string;
};

export type CreateOrderOutput = {
    orderId: string;
    amount: number;
    currency: string;
};

export interface IPaymentGatewayService {
    createOrder(input: CreateOrderInput): Promise<CreateOrderOutput>;

    verifyPayment?(payload: { orderId: string; paymentId: string; signature: string }): boolean;
}
