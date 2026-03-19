// import { inject, injectable } from "tsyringe";
// import mongoose from "mongoose";
// import { IConfirmBookingUseCase } from "../../../../Application/interfaces/useCase_Interfaces/user/Booking/IConfirmBookingUseCase";
// // import { IConfirmBookingUseCase } from "../../..//interfaces/useCase_Interfaces/Logistics/IConfirmBookingUseCase";
// // import { IParcelRouteRepository } from "../../../interfaces/repositories_interfaces/IParcelRouteRepository";
// // import { IRouteSegmentRepository } from "../../../interfaces/repositories_interfaces/IRouteSegmentRepository";
// // import { IBookingRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
// // import { RouteComputationService } from "../../../Domain/Services/Logistics/RouteComputationService";
// // import { ParcelRouteMapper } from "../../Mappers/Logistics/ParcelRouteMapper";
// // import { AppError } from "../../../Domain/utils/customError";
// // import { STATUS } from "../../../Infrastructure/constants/statusCodes";
// // import logger from "../../../Infrastructure/logger/logger";

// const MSG = {
//     BOOKING_NOT_FOUND: "Booking not found",
//     HUB_IDS_MISSING:   "Booking is missing originHubId or destinationHubId in logistics",
//     SAME_HUB:          "Origin and destination hub cannot be the same",
//     NO_ROUTE_FOUND:    "No active route found between the booking hubs",
// } as const;

// @injectable()
// export class ConfirmBookingUseCase implements IConfirmBookingUseCase {

//     private readonly _routeComputation = new RouteComputationService();

//     constructor(
//         @inject("IParcelRouteRepository")
//         private readonly _parcelRouteRepo: IParcelRouteRepository,

//         @inject("IRouteSegmentRepository")
//         private readonly _routeSegmentRepo: IRouteSegmentRepository,

//         @inject("IBookingRepository")
//         private readonly _bookingRepo: IBookingRepository,
//     ) { }

//     async execute(bookingId: string): Promise<{ parcelRouteId: string }> {

//         // ── 1. Load booking ───────────────────────────────────────────────
//         const booking = await this._bookingRepo.getBookingById(bookingId);
//         if (!booking) throw new AppError(MSG.BOOKING_NOT_FOUND, STATUS.NOT_FOUND);

//         // ── 2. Guard: hub IDs must exist ──────────────────────────────────
//         const originHubId      = booking.logistics?.originHubId as string | undefined;
//         const destinationHubId = booking.logistics?.destinationHubId as string | undefined;

//         if (!originHubId || !destinationHubId) {
//             throw new AppError(MSG.HUB_IDS_MISSING, STATUS.BAD_REQUEST);
//         }

//         if (originHubId === destinationHubId) {
//             throw new AppError(MSG.SAME_HUB, STATUS.BAD_REQUEST);
//         }

//         // ── 3. Idempotency guard — webhook retries won't double-create ────
//         const existing = await this._parcelRouteRepo.findByBookingId(bookingId);
//         if (existing) {
//             logger.info(`[ConfirmBooking] Route already exists for booking ${bookingId} — skipping`);
//             return { parcelRouteId: existing.id! };
//         }

//         // ── 4. Fetch all active segments ──────────────────────────────────
//         const allSegments = await this._routeSegmentRepo.findAllActive();

//         // ── 5. Compute route — pure domain logic, zero DB calls ───────────
//         const chain = this._routeComputation.compute(originHubId, destinationHubId, allSegments);

//         if (chain.length === 0) {
//             throw new AppError(MSG.NO_ROUTE_FOUND, STATUS.BAD_REQUEST);
//         }

//         // ── 6. Persist inside transaction ─────────────────────────────────
//         const session = await mongoose.startSession();
//         session.startTransaction();

//         try {
//             const parcelRoute = await this._parcelRouteRepo.save(
//                 ParcelRouteMapper.toCreate(bookingId),
//                 session
//             );

//             await this._parcelRouteRepo.saveLegs(
//                 ParcelRouteMapper.legsToCreate(parcelRoute.id!, chain),
//                 session
//             );

//             await this._bookingRepo.updateLogistics(
//                 bookingId,
//                 { parcelRouteId: parcelRoute.id!, lastUpdatedAt: new Date() },
//                 session
//             );

//             await session.commitTransaction();

//             logger.info(`[ConfirmBooking] Route ${parcelRoute.id} — ${chain.length} legs for booking ${bookingId}`);

//             return { parcelRouteId: parcelRoute.id! };

//         } catch (err) {
//             await session.abortTransaction();
//             throw err;
//         } finally {
//             session.endSession();
//         }
//     }
// }