import { Booking } from "../../../../Domain/Entities/Booking/Booking";
import { AppError } from "../../../../Domain/utils/customError";
import { BOOKING_MESSAGE } from "../../../../Infrastructure/constants/messages/bookingMessages";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { BookingStatusType } from "../../../../Infrastructure/Types/types";
import { IBookingRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { ITravelRequestRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/ITravelRequestRepository";
import { ITransactionRepository } from "../../../interfaces/repositories_interfaces/walletRepositories_Interfaces/ITransactionRepository";
import { IWalletRepository } from "../../../interfaces/repositories_interfaces/walletRepositories_Interfaces/IWalletRepository";
import { IUpdateBookingStatusUsecase } from "../../../interfaces/useCase_Interfaces/user/Booking/IUpdateBookingStatusUsecase";
import { TransactionMapper } from "../../../Mappers/Wallet/transactionMapper";
import mongoose from "mongoose";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateBookingStatusUsecase implements IUpdateBookingStatusUsecase {
    constructor(
        @inject("IBookingRepository") private _bookingRepo: IBookingRepository,
        @inject("IWalletRepository") private readonly _walletRepo: IWalletRepository,
        @inject("ITravelRequestRepository") private readonly _travelRequestRepository: ITravelRequestRepository,
        @inject("ITransactionRepository") private readonly _transactionRepo: ITransactionRepository,


    ) { }

    async execute(userId: string, bookingId: string, status: BookingStatusType): Promise<void> {

        const booking = await this._bookingRepo.getBookingById(bookingId);
        if (!booking) throw new AppError(BOOKING_MESSAGE.NOT_FOUND, STATUS.NOT_FOUND);
        if (booking.status === status) throw new AppError(BOOKING_MESSAGE.STATUS_ALREADY_SET, STATUS.BAD_REQUEST);

        this.validateTransition(booking.status, status);

        if (status == "DELIVERED") {
            await this.handleSettlement(booking, userId);
        }

        await this._bookingRepo.updateStatus(bookingId, status)

        await this.updateTravelRequestStatus(booking);

    }

    private validateTransition(
        current: BookingStatusType,
        next: BookingStatusType
    ) {
        const STATUS_TRANSITIONS: Record<BookingStatusType, BookingStatusType[]> = {
            PAID_PENDING_PICKUP: ["READY_FOR_PICKUP"],
            READY_FOR_PICKUP: ["PICKUP_STARTED"],
            PICKUP_STARTED: ["IN_TRANSIT"],
            IN_TRANSIT: ["DELIVERED"],
            DELIVERED: [],
            CREATED: [],
            PAYMENT_PENDING: [],
            CANCELLED_BEFORE_PICKUP: [],
            CANCELLED_AFTER_PICKUP: [],
            CANCELLED_BY_USER: [],
            CANCELLED_BY_TRAVELER: [],
            REFUNDED: [],
            SETTLED: [],
        };

        const allowedNext = STATUS_TRANSITIONS[current] || [];

        if (!allowedNext.includes(next)) {
            throw new AppError(BOOKING_MESSAGE.INVALID_STATUS_TRANSITION, STATUS.BAD_REQUEST);
        }


    }

    private async handleSettlement(booking: Booking, userId: string) {
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const travelerWallet = await this._walletRepo.findByOwner("user", userId);
            if (!travelerWallet) throw new AppError("Traveler wallet not found");

            const adminWallet = await this._walletRepo.getAdminWallet();
            if (!adminWallet) throw new AppError("Admin wallet not found");

            const totalAmount = booking.pricing.totalAmount;

            const commission = booking.pricing.platformFee;
            const travelerAmount = totalAmount - commission;

            // Step 1: release FULL amount from admin hold
            if (adminWallet.lockedBalance < totalAmount) {
                throw new AppError("Admin locked balance insufficient");
            }
            adminWallet.release(totalAmount);
            const adminReleaseTx = TransactionMapper.createRelease(
                adminWallet.id!,
                totalAmount,
                adminWallet.balance,
                { bookingId: booking.id }
            );

            //  Step 2: admin keeps commission
            adminWallet.debit(travelerAmount);
            const adminDebitTx = TransactionMapper.createDebit(
                adminWallet.id!,
                travelerAmount,
                "SETTLEMENT",
                adminWallet.balance,
                { bookingId: booking.id }
            );


            // Step 3: pay traveler
            travelerWallet.credit(travelerAmount);
            const travelerCreditTx = TransactionMapper.createCredit(
                travelerWallet.id!,
                travelerAmount,
                "PAYOUT",
                travelerWallet.balance,
                { bookingId: booking.id }
            );

            // Save both
            await this._walletRepo.update(travelerWallet, session);
            await this._walletRepo.update(adminWallet, session);

            await this._transactionRepo.create(adminReleaseTx, session);
            await this._transactionRepo.create(adminDebitTx, session);
            await this._transactionRepo.create(travelerCreditTx, session);

            await session.commitTransaction();
        } catch (err) {
            await session.abortTransaction();
            throw err;
        } finally {
            session.endSession();
        }
    }

    private async updateTravelRequestStatus(booking: Booking) {

        if (!booking.partnerSnapshot?.partnerId) throw new AppError(BOOKING_MESSAGE.PARTNER_ID_MISSING, STATUS.NOT_FOUND)

        const travelRequestId = booking.partnerSnapshot?.partnerId

        const travelRequest = await this._travelRequestRepository.getTravelRequestById(travelRequestId);
        if (!travelRequest) return;

        const bookings = await this._bookingRepo.findByTravelRequestId(travelRequestId);

        if (!bookings.length) return;

        const allDelivered = bookings.every(b => b.status === "DELIVERED");

        const anyStarted = bookings.some(b =>
            b.status === "PICKUP_STARTED" || b.status === "IN_TRANSIT"
        );

        //  Rule 1: Any started → ACTIVE
        if (anyStarted && travelRequest.status !== "ACTIVE") {
            travelRequest.status = "ACTIVE";
        }

        //  Rule 2: All delivered → COMPLETED
        if (allDelivered) {
            travelRequest.status = "COMPLETED";
        }

        await this._travelRequestRepository.update(travelRequest);
    }

}