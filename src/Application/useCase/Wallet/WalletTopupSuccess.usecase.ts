import { inject, injectable } from "tsyringe";
import { IWalletTopupSuccessUseCase } from "../../interfaces/useCase_Interfaces/Wallet/IWalletTopupSuccessUseCase";
import { ITransactionRepository } from "../../interfaces/repositories_interfaces/walletRepositories_Interfaces/ITransactionRepository";
import { IWalletRepository } from "../../interfaces/repositories_interfaces/walletRepositories_Interfaces/IWalletRepository";
import { AppError } from "../../../Domain/utils/customError";
import { WALLET_MESSAGES } from "../../../Infrastructure/constants/messages/walletMessages";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";

@injectable()
export class WalletTopupSuccessUseCase implements IWalletTopupSuccessUseCase {

    constructor(
        @inject("ITransactionRepository") private readonly _transactionRepo: ITransactionRepository,
        @inject("IWalletRepository") private readonly _walletRepo: IWalletRepository
    ) { }

    async execute(razorpayOrderId: string, razorpayPaymentId: string,): Promise<void> {

        const transaction = await this._transactionRepo.findByGatewayReferenceId(razorpayOrderId);


        if (!transaction) throw new AppError(WALLET_MESSAGES.TRANSACTION_NOT_FOUND,STATUS.NOT_FOUND)

        if (transaction.status !== "PENDING") throw new AppError(WALLET_MESSAGES.PAYMENT_NOT_ALLOWED,STATUS.BAD_REQUEST)

        const wallet = await this._walletRepo.findWalletById(transaction.walletId);
        if (!wallet) return;

        wallet.credit(transaction.amount);
        await this._walletRepo.update(wallet);

        await this._transactionRepo.markSuccess(transaction.id!, {
            balanceAfter: wallet.balance,
            gatewayPaymentId: razorpayPaymentId,
        });

    }
}
