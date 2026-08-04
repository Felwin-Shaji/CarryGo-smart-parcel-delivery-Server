import { TransactionReason } from "../../../../Domain/Entities/Wallet/WalletTransaction";
import { Role } from "../../../../Infrastructure/Types/types";

export type CreateOrderInput = {
    amount: number;
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

export type CreatePayoutInput = {
    amount: number;
    currency: "INR";
    notes: {
        type: TransactionReason;
        ownerId: string;
        ownerRole: Role;
    };
};

export type CreatePayoutOutput = {
    payoutId: string;
    amount: number;
    currency: string;
    status:  "queued" | "processing" | "processed" | "failed" | "pending" | "reversed";
};


export interface IPaymentGatewayService {
    createOrder(input: CreateOrderInput): Promise<CreateOrderOutput>;

    createPayout?(input: CreatePayoutInput): Promise<CreatePayoutOutput>;

    verifyPayment?(payload: { orderId: string; paymentId: string; signature: string }): boolean;
}
