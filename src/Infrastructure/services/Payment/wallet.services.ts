// import { inject, injectable } from "tsyringe";
// import { IWalletService } from "../../../Application/interfaces/services_Interfaces/IWalletService";
// import { IWalletRepository } from "../../../Application/interfaces/repositories_interfaces/walletRepositories_Interfaces/IWalletRepository";
// import { ITransactionRepository } from "../../../Application/interfaces/repositories_interfaces/walletRepositories_Interfaces/ITransactionRepository";
// import mongoose from "mongoose";
// import { AppError } from "../../../Domain/utils/customError";
// import { WALLET_MESSAGES } from "../../constants/messages/walletMessages";

// @injectable()
// export class WalletService implements IWalletService {
//     constructor(
//         @inject("IWalletRepository") private _walletRepo: IWalletRepository,
//         @inject("ITransactionRepository") private _transactionRepo: ITransactionRepository
//     ) { }

//     async holdAmount(walletId: string, amount: number, orderId: string, gatewayReferenceId?: string): Promise<void> {
//         const session = await mongoose.startSession();

//         try {
//             await session.withTransaction(async () => {
//                 const wallet = await this._walletRepo.findWalletById(walletId);
//                 if (!wallet) {
//                     throw new AppError(WALLET_MESSAGES.WALLET_NOT_FOUND);
//                 }

//                 wallet.hold(amount);

//                 await this._walletRepo.update(wallet, session);

//                 await this._transactionRepo.create(
//                     {
//                         walletId: walletId,
//                         type: "HOLD",
//                         reason: "BOOKING_PAYMENT",
//                         amount,
//                         orderId,
//                         gatewayReferenceId,
//                         balanceAfter: wallet.balance,
//                         status: "SUCCESS",
//                         id: null,
//                         createdAt: new Date()
//                     },
//                     session
//                 );
//             });
//         } finally {
//             session.endSession();
//         }

//     };

//     async releaseAmount(walletId: string, amount: number, reason: "SETTLEMENT" | "REFUND", orderId: string): Promise<void> {
//         const session = await mongoose.startSession();

//         try {
//             await session.withTransaction(async () => {
//                 const wallet = await this._walletRepo.findWalletById(walletId);
//                 if (!wallet) {
//                     throw new AppError(WALLET_MESSAGES.WALLET_NOT_FOUND);
//                 }

//                 wallet.release(amount);

//                 await this._walletRepo.update(wallet, session);

//                 await this._transactionRepo.create(
//                     {
//                         walletId: walletId,
//                         type: "RELEASE",
//                         reason,
//                         amount,
//                         orderId,
//                         balanceAfter: wallet.balance,
//                         status: "SUCCESS",
//                         id: null,
//                         createdAt: new Date()
//                     },
//                     session
//                 );
//             });
//         } finally {
//             session.endSession();
//         }
//     };

//     async credit(walletId: string, amount: number, reason: "COMMISSION" | "ADJUSTMENT", orderId?: string, metadata?: Record<string, any>): Promise<void> {
//         const session = await mongoose.startSession();

//         try {
//             await session.withTransaction(async () => {
//                 const wallet = await this._walletRepo.findWalletById(walletId);
//                 if (!wallet) {
//                     throw new AppError(WALLET_MESSAGES.WALLET_NOT_FOUND);
//                 }

//                 wallet.credit(amount);

//                 await this._walletRepo.update(wallet, session);

//                 await this._transactionRepo.create(
//                     {
//                         walletId: walletId,
//                         type: "CREDIT",
//                         reason,
//                         amount,
//                         orderId,
//                         balanceAfter: wallet.balance,
//                         status: "SUCCESS",
//                         metadata,
//                         id: null,
//                         createdAt: new Date()
//                     },
//                     session
//                 );
//             });
//         } finally {
//             session.endSession();
//         }
//     };

//     async debit(walletId: string, amount: number, reason: "PAYOUT" | "ADJUSTMENT", metadata?: Record<string, any>): Promise<void> {
//         const session = await mongoose.startSession();

//         try {
//             await session.withTransaction(async () => {
//                 const wallet = await this._walletRepo.findWalletById(walletId);
//                 if (!wallet) {
//                     throw new AppError(WALLET_MESSAGES.WALLET_NOT_FOUND);
//                 }

//                 wallet.debit(amount);

//                 await this._walletRepo.update(wallet, session);

//                 await this._transactionRepo.create(
//                     {
//                         walletId: walletId,
//                         type: "DEBIT",
//                         reason,
//                         amount,
//                         balanceAfter: wallet.balance,
//                         status: "SUCCESS",
//                         metadata,
//                         id: null,
//                         createdAt: new Date()
//                     },
//                     session
//                 );
//             });
//         } finally {
//             session.endSession();
//         }
//     };
// }