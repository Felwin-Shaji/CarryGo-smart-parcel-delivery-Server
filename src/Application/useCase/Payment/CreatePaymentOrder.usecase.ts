import { inject, injectable } from "tsyringe";
import { IPaymentGateway } from "../../interfaces/services_Interfaces/payment/IPaymentGateway";
import { ICreatePaymentOrderUsecase } from "../../interfaces/useCase_Interfaces/Payment/ICreatePaymentOrderUsecase";

@injectable()
export class CreatePaymentOrderUsecase implements ICreatePaymentOrderUsecase {
    constructor(
        @inject("IPaymentGateway") private paymentGateway: IPaymentGateway
    ) { }

    async execute(payload: {
        bookingId: string;
        amount: number;
    }) {
        const order = await this.paymentGateway.createOrder({
            amount: payload.amount,
            currency: "INR",
            receipt: payload.bookingId,
        });

        return {
            orderId: order.orderId,
            amount: order.amount,
            currency: order.currency,
        };
    }
}
