import { paymentController } from "../../Infrastructure/DI/resolver";
import { BaseRoute } from "./base.route";
import bodyParser from "body-parser";

export class PaymentRoute extends BaseRoute {
    constructor() {
        super()
    }

    protected initializeRoutes(): void {
        this.router.post(
            "/razorpay",
            bodyParser.raw({ type: "application/json" }),
            paymentController.razorpayWebhook
        );
    }
}