import { inject, injectable } from "tsyringe";
import { IPaymentGatewayService } from "../../interfaces/services_Interfaces/payment/IPaymentGateway";
import { ICreatePaymentOrderUsecase } from "../../interfaces/useCase_Interfaces/Payment/ICreatePaymentOrderUsecase";

@injectable()
export class CreatePaymentOrderUsecase implements ICreatePaymentOrderUsecase {
    constructor(
        @inject("IPaymentGatewayService") private _paymentGatewayService: IPaymentGatewayService
    ) { }

    async execute(payload: {
        bookingId: string;
        amount: number;
    }) {
        const order = await this._paymentGatewayService.createOrder({
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
