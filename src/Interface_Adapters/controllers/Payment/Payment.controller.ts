import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import crypto from "crypto";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IWalletTopupSuccessUseCase } from "../../../Application/interfaces/useCase_Interfaces/Wallet/IWalletTopupSuccessUseCase";
import { IBookingPaymentSuccessUseCase } from "../../../Application/interfaces/useCase_Interfaces/Payment/IBookingPaymentSuccessUseCase";
import logger from "../../../Infrastructure/logger/logger";
import { IBookingPaymentFailedUseCase } from "../../../Application/interfaces/useCase_Interfaces/Payment/IBookingPaymentFailedUseCase";

@injectable()
export class PaymentController {

    constructor(
        @inject("IWalletTopupSuccessUseCase") private readonly _walletTopupSuccessUseCase: IWalletTopupSuccessUseCase,
        @inject("IBookingPaymentSuccessUseCase") private readonly _bookingPaymentSuccessUseCase: IBookingPaymentSuccessUseCase,
        @inject("IBookingPaymentFailedUseCase") private readonly _bookingPaymentFailedUseCase: IBookingPaymentFailedUseCase,
    ) { }

    razorpayWebhook = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const razorpaySignature = req.headers["x-razorpay-signature"] as string;

            const rawBody = Buffer.isBuffer(req.body)
                ? req.body
                : Buffer.from(JSON.stringify(req.body));

            const expectedSignature = crypto
                .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
                .update(rawBody)
                .digest("hex");

            if (razorpaySignature !== expectedSignature) {
                return res.status(STATUS.BAD_REQUEST).send("Invalid signature");
            }

            const event = JSON.parse(rawBody.toString());
            // const event = JSON.parse(req.body.toString());

            console.log(event.payload.payment.entity, 'event event event event event event event event event event event ')

            const payment = event?.payload?.payment?.entity;
            if (!payment) {
                return res.status(STATUS.OK).send("No payment entity");
            }

            if (event.event === "payment.captured") {

                //  Decide flow based on receipt / notes
                if (payment.notes?.type === "WALLET_TOPUP") {
                    await this._walletTopupSuccessUseCase.execute(
                        payment.order_id,
                        payment.id,
                    );
                }

                if (payment.notes?.type === "BOOKING_PAYMENT") {
                    await this._bookingPaymentSuccessUseCase.execute(
                        payment.notes.bookingId,
                        payment.id,
                    );
                }
            }

            console.log("Webhook event:", event.event,"🔻🔻🔻🔻🔻🔻");

            if (event.event === "payment.failed") {
                console.log('✌️✌️✌️✌️✌️✌️✌️✌️✌️✌️✌️✌️✌️✌️✌️✌️✌️✌️✌️✌️✌️✌️✌️✌️')
                if (payment.notes?.type === "BOOKING_PAYMENT") {
                    await this._bookingPaymentFailedUseCase.execute(
                        payment.notes.bookingId,
                        payment.error_description
                    );
                };
            }

            return res.status(STATUS.OK).send("OK");

        } catch (error) {
            logger.error(error);
            return res.status(200).send("ACK");
        }
    };
}
