import { ClientSession } from "mongoose";
import { ParcelMovement } from "../../../../Domain/Entities/Booking/ParcelMovement";

export interface IParcelMovementRepository {

    save(movement: ParcelMovement, session?: ClientSession): Promise<ParcelMovement>;

    findByBookingId(bookingId: string, session?: ClientSession): Promise<ParcelMovement[]>;
}