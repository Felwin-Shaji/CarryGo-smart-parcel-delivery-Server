import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import crypto from "crypto";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IWalletTopupSuccessUseCase } from "../../../Application/interfaces/useCase_Interfaces/Wallet/IWalletTopupSuccessUseCase";

@injectable()
export class PaymentController {

    constructor(
        @inject("IWalletTopupSuccessUseCase") private readonly _walletTopupSuccessUseCase: IWalletTopupSuccessUseCase
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

            if (event.event === "payment.captured") {
                const payment = event.payload.payment.entity;
                await this._walletTopupSuccessUseCase.execute(payment.order_id, payment.id,);
            }

            return res.status(STATUS.OK).send("OK");

        } catch (error) {
            console.error("Webhook error:", error);

            next(error)

        }
    };
}
