import { inject, injectable } from "tsyringe";
import { ICreateWalletTopupOrderUseCase } from "../../interfaces/useCase_Interfaces/Wallet/ICreateWalletTopupOrderUseCase";
import { IPaymentGatewayService } from "../../interfaces/services_Interfaces/payment/IPaymentGateway";
import { IWalletRepository } from "../../interfaces/repositories_interfaces/walletRepositories_Interfaces/IWalletRepository";
import { ITransactionRepository } from "../../interfaces/repositories_interfaces/walletRepositories_Interfaces/ITransactionRepository";
import { Transaction } from "../../../Domain/Entities/Wallet/WalletTransaction";
import { AppError } from "../../../Domain/utils/customError";
import { WALLET_MESSAGES } from "../../../Infrastructure/constants/messages/walletMessages";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";


@injectable()
export class CreateWalletTopupOrderUseCase implements ICreateWalletTopupOrderUseCase {
    constructor(
        @inject("IPaymentGatewayService") private readonly paymentGateway: IPaymentGatewayService,
        @inject("IWalletRepository") private readonly walletRepo: IWalletRepository,
        @inject("ITransactionRepository") private readonly transactionRepo: ITransactionRepository
    ) { }

    async execute(ownerId: string, amount: number) {
        if (amount <= 0) throw new AppError(WALLET_MESSAGES.INVALID_AMOUNT, STATUS.BAD_REQUEST)

        const key = process.env.RAZORPAY_KEY_ID?.toString();
        if (!key) throw new AppError(WALLET_MESSAGES.PAYMENTGATEWAY_KEY_NOT_FOUND);


        const wallet = await this.walletRepo.findByOwner("user", ownerId);
        if (!wallet) throw new AppError(WALLET_MESSAGES.WALLET_NOT_FOUND, STATUS.NOT_FOUND);

        const order = await this.paymentGateway.createOrder({
            amount,
            currency: "INR",
            receipt: `wt_${ownerId.slice(-6)}_${Date.now().toString().slice(-6)}`

        });

        const transaction = new Transaction(
            null,
            wallet.id!,
            "CREDIT",
            "WALLET_TOPUP",
            amount,
            "PENDING",
            wallet.balance,
            undefined,
            undefined,
            order.orderId
        );

        await this.transactionRepo.create(transaction);

        return {
            key,
            orderId: order.orderId,
            amount: order.amount,
            currency: order.currency,
        };
    }
}
