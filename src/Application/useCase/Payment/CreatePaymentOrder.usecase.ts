import { inject, injectable } from "tsyringe";
import { IPaymentGatewayService } from "../../interfaces/services_Interfaces/payment/IPaymentGateway";
import { ICreatePaymentOrderUsecase } from "../../interfaces/useCase_Interfaces/Payment/ICreatePaymentOrderUsecase";
import { IGetBookingUsecase } from "../../interfaces/useCase_Interfaces/user/Booking/IGetBookingUsecase";
import { Role } from "../../../Domain/Enums/Roles";

@injectable()
export class CreatePaymentOrderUsecase implements ICreatePaymentOrderUsecase {
    constructor(
        @inject("IPaymentGatewayService") private _paymentGatewayService: IPaymentGatewayService,
        @inject("IGetBookingUsecase") private _getBookingUsecase: IGetBookingUsecase,

    ) { }

    async execute(userId: string, bookingId: string) {

        const key = process.env.RAZORPAY_KEY_ID

        const booking = await this._getBookingUsecase.execute(bookingId);

        const order = await this._paymentGatewayService.createOrder({
            amount: booking.pricing.totalAmount,
            currency: "INR",
            receipt: bookingId,
            notes: {
                type: "BOOKING_PAYMENT",
                ownerId: userId,
                ownerRole: Role.USER,
                bookingId: bookingId,
            },
        });

        return {
            orderId: order.orderId,
            amount: order.amount,
            currency: order.currency,
            key: key!
        };
    }
}
