import { ClientSession } from "mongoose";
import { ParcelRouteLeg } from "../../../Domain/Entities/Logistics/ParcelRouteLeg";

export interface IHubShipmentAssignmentService {
    assignLegToShipment(leg: ParcelRouteLeg, bookingId: string, session: ClientSession): Promise<void>
}