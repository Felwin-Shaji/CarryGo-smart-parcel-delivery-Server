import { IBaseRepository } from "@/Application/interfaces/repositories_interfaces/base.repository";
import { HubShipment, ShipmentType } from "@/Domain/Entities/Logistics/HubShipment";
import { ClientSession } from "mongoose";
import { GetShipmentsDTO, GetWorkerShipmentDTO } from "@/Application/Dto/Logistics/shipment.dto";


export interface HubShipmentPaginatedData {
    data: HubShipment[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

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

    findOpenShipmentByHubAndType(
        hubId: string,
        type: ShipmentType,
        session?: ClientSession
    ): Promise<HubShipment | null>;

    getPaginatedShipments(
        hubId: string,
        dto: GetShipmentsDTO
    ): Promise<HubShipmentPaginatedData>;

    getPaginatedShipmentsForWorker(
        workerId: string,
        dto: GetWorkerShipmentDTO
    ): Promise<HubShipmentPaginatedData>;

    findByIds(ids: string[], session?: ClientSession): Promise<HubShipment[]>;

    findActiveByWorker(workerId: string): Promise<HubShipment | null>;

    countCompleted(workerId: string): Promise<number>;

    countToday(workerId: string, date: Date): Promise<number>;

    getShipmentSummary(
        hubId: string,
    ): Promise<{
        total: number;
        pending: number;
        active: number;
        arrived: number;
        completed: number;
        cancelled: number;
    }>;

    getShipmentTrend(
        hubId: string,
        from?: string,
        to?: string
    ): Promise<{ date: string; count: number }[]>;

    getShipmentTypes(
        hubId: string
    ): Promise<{
        hubTransfer: number;
        outForDelivery: number;
        bulkPickup: number;
    }>;

    findRecentShipmentsByHub(
        hubId: string,
        limit: number
    ): Promise<HubShipment[]>;

    findUnassignedShipmentsByHub(
        hubId: string,
        limit: number
    ): Promise<HubShipment[]>;
}