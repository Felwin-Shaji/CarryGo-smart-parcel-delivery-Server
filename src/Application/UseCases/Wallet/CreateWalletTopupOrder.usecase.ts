import { inject, injectable } from "tsyringe";
import { ICreateWalletTopupOrderUseCase } from "../../Interfaces/UseCases/Wallet/ICreateWalletTopupOrderUseCase";
import { IPaymentGatewayService } from "../../Interfaces/Services/Payment/IPaymentGateway";
import { IWalletRepository } from "../../Interfaces/Repositories/Wallet/IWalletRepository";
import { ITransactionRepository } from "../../Interfaces/Repositories/Wallet/ITransactionRepository";
import { Transaction } from "../../../Domain/Entities/Wallet/WalletTransaction";
import { AppError } from "../../../Domain/Utils/customError";
import { WALLET_MESSAGES } from "../../../Infrastructure/Constants/Messages/walletMessages";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { Role } from "../../../Infrastructure/Types/types";


@injectable()
export class CreateWalletTopupOrderUseCase implements ICreateWalletTopupOrderUseCase {
    constructor(
        @inject("IPaymentGatewayService") private readonly _paymentGateway: IPaymentGatewayService,
        @inject("IWalletRepository") private readonly _walletRepo: IWalletRepository,
        @inject("ITransactionRepository") private readonly _transactionRepo: ITransactionRepository
    ) { }

    async execute(owner: Role, ownerId: string, amount: number) {
        if (amount <= 0) throw new AppError(WALLET_MESSAGES.INVALID_AMOUNT, STATUS.BAD_REQUEST)

        const key = process.env.RAZORPAY_KEY_ID?.toString();
        if (!key) throw new AppError(WALLET_MESSAGES.PAYMENTGATEWAY_KEY_NOT_FOUND);


        const wallet = await this._walletRepo.findByOwner(owner, ownerId);
        if (!wallet) throw new AppError(WALLET_MESSAGES.WALLET_NOT_FOUND, STATUS.NOT_FOUND);

        const order = await this._paymentGateway.createOrder({
            amount,
            currency: "INR",
            receipt: `wt_${ownerId.slice(-6)}_${Date.now().toString().slice(-6)}`,
            notes: {
                type: "WALLET_TOPUP",
                ownerId,
                ownerRole: owner,
            },
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

        await this._transactionRepo.create(transaction);

        return {
            key,
            orderId: order.orderId,
            amount: order.amount,
            currency: order.currency,
        };
    }
}
