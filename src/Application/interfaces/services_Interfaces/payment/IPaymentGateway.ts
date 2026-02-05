import { TransactionReason } from "../../../../Domain/Entities/Wallet/WalletTransaction";
import { Role } from "../../../../Infrastructure/Types/types";

export type CreateOrderInput = {
    amount: number;        // in INR
    currency: "INR";
    receipt: string;
    notes: {
        type: TransactionReason;
        ownerId: string;
        ownerRole: Role;
        bookingId?: string;
    }
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
