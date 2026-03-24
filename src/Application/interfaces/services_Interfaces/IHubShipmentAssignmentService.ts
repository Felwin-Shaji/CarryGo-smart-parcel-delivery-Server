import { ParcelRouteLeg } from "@/Domain/Entities/Logistics/ParcelRouteLeg";
import { ClientSession } from "mongoose";

export interface IHubShipmentAssignmentService {
    assignLegToShipment(leg: ParcelRouteLeg, bookingId: string, session: ClientSession): Promise<void>
}