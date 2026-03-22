import { IBaseRepository } from "@/Application/interfaces/repositories_interfaces/base.repository";
import { HubShipment } from "@/Domain/Entities/Logistics/HubShipment";
import { ClientSession } from "mongoose";


export interface IHubShipmentRepository extends IBaseRepository<HubShipment> {

    /**
     * Find an existing PENDING shipment for a segment that still has capacity.
     * Used to batch multiple parcels into the same truck run.
     * Returns null if none exists — caller should create a new shipment.
     */
    findOpenShipmentForSegment(
        segmentId: string,
        session?: ClientSession
    ): Promise<HubShipment | null>;
}