import { inject, injectable } from "tsyringe";
import { IPaymentGatewayService } from "../../Interfaces/Services/Payment/IPaymentGateway";
import { ICreatePaymentOrderUsecase } from "../../Interfaces/UseCases/Payment/ICreatePaymentOrderUseCase";
import { IGetBookingUsecase } from "../../Interfaces/UseCases/User/Booking/IGetBookingUseCase";
import { Role } from "../../../Domain/Enums/Role";
import { IBookingRepository } from "../../Interfaces/Repositories/User/IBookingRepository";

@injectable()
export class CreatePaymentOrderUsecase implements ICreatePaymentOrderUsecase {
    constructor(
        @inject("IPaymentGatewayService") private _paymentGatewayService: IPaymentGatewayService,
        @inject("IGetBookingUsecase") private _getBookingUsecase: IGetBookingUsecase,
        @inject("IBookingRepository") private readonly _bookingRepo: IBookingRepository,
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

        await this._bookingRepo.updatePayment(booking.id!, {
            orderRef: order.orderId,
            paymentStatus: "ORDER_CREATED"
        });
        
        return {
            orderId: order.orderId,
            amount: order.amount,
            currency: order.currency,
            key: key!
        };
    }
}
