import { inject, injectable } from "tsyringe";
import { IWithdrawWalletMoneyUseCase } from "../../interfaces/useCase_Interfaces/Wallet/IWithdrawWalletMoneyUseCase";
import { IWalletRepository } from "../../interfaces/repositories_interfaces/walletRepositories_Interfaces/IWalletRepository";
import { ITransactionRepository } from "../../interfaces/repositories_interfaces/walletRepositories_Interfaces/ITransactionRepository";
import { IPaymentGatewayService } from "../../interfaces/services_Interfaces/payment/IPaymentGateway";
import { Role } from "../../../Infrastructure/Types/types";
import { AppError } from "../../../Domain/utils/customError";
import { WALLET_MESSAGES } from "../../../Infrastructure/constants/messages/walletMessages";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import mongoose from "mongoose";
import { Transaction } from "../../../Domain/Entities/Wallet/WalletTransaction";


@injectable()
export class WithdrawWalletMoneyUseCase implements IWithdrawWalletMoneyUseCase {
    constructor(
        @inject("IWalletRepository") private readonly _walletRepo: IWalletRepository,
        @inject("ITransactionRepository") private readonly _transactionRepo: ITransactionRepository,
        @inject("IPaymentGatewayService") private readonly _paymentGateway: IPaymentGatewayService
    ) { }

    async execute(owner: Role, ownerId: string, amount: number) {
        if (amount <= 0) throw new AppError(WALLET_MESSAGES.INVALID_AMOUNT, STATUS.BAD_REQUEST);

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const wallet = await this._walletRepo.findByOwner(owner, ownerId);
            if (!wallet) throw new AppError(WALLET_MESSAGES.WALLET_NOT_FOUND, STATUS.NOT_FOUND);

            wallet.debit(amount);

            // if (!this._paymentGateway.createPayout) throw new AppError(WALLET_MESSAGES.PAYMENT_NOT_ALLOWED, STATUS.BAD_REQUEST);
            


            // const payout = await this._paymentGateway.createPayout({
            //     amount,
            //     currency: "INR",
            //     notes: {
            //         type: "WALLET_WITHDRAW",
            //         ownerId,
            //         ownerRole: owner
            //     },
            // });



            const transaction = new Transaction(
                null,
                wallet.id!,
                "DEBIT",
                "PAYOUT",
                amount,
                "PENDING",
                wallet.balance!,
                undefined,
                wallet.id!
            );

            await this._walletRepo.update(wallet, session);
            await this._transactionRepo.create(transaction, session);

            await session.commitTransaction();
            session.endSession();

            return {
                payoutId: wallet.id!,
                amount,
                balance: wallet.balance,
            };
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }

    }
}