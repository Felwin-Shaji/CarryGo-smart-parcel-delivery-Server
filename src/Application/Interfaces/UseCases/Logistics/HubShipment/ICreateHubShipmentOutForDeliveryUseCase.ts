import { ClientSession } from "mongoose";

export interface ICreateHubShipmentOutForDeliveryUsecase {
    execute(bookingId: string, session?: ClientSession): Promise<void>
}