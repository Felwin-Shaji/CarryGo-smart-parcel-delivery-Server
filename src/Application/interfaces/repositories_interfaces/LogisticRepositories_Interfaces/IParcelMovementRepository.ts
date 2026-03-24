import { ParcelMovement } from "@/Domain/Entities/Booking/ParcelMovement";
import { ClientSession } from "mongoose";

export interface IParcelMovementRepository {

    save(movement: ParcelMovement, session?: ClientSession): Promise<ParcelMovement>;

    findByBookingId(bookingId: string, session?: ClientSession): Promise<ParcelMovement[]>;
}