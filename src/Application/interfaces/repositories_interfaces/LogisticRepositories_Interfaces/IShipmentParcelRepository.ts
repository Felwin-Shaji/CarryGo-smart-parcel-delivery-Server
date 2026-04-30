import { ClientSession } from "mongoose";
import { ShipmentParcel, ShipmentParcelStatus } from "../../../../Domain/Entities/Logistics/ShipmentParcel";
import { GetWorkerGraphRequestDTO, GetWorkerGraphResponseDTO, GetWorkerParcelsDTO, GetWorkerParcelsResponseDTO } from "@/Application/Dto/Workers/worker.dto";

export interface IShipmentParcelRepository {

    save(shipmentParcel: ShipmentParcel, session?: ClientSession): Promise<ShipmentParcel>;

    findByIds(ids: string[], session?: ClientSession): Promise<ShipmentParcel[]>;

    findByShipmentId(shipmentId: string, session?: ClientSession): Promise<ShipmentParcel[]>;

    findByBookingId(bookingId: string, session?: ClientSession): Promise<ShipmentParcel[]>;

    findByShipmentIdPaginated(shipmentId: string, page: number, limit: number, session?: ClientSession): Promise<{ parcels: ShipmentParcel[]; total: number }>;

    updateStatus(
        shipmentParcelId: string,
        status: ShipmentParcelStatus,
        session?: ClientSession
    ): Promise<void>;

    bulkUpdateStatus(
        parcelIds: string[],
        status: ShipmentParcelStatus,
        session?: ClientSession
    ): Promise<void>;

    getWorkerParcels(
        workerId: string,
        dto: GetWorkerParcelsDTO
    ): Promise<GetWorkerParcelsResponseDTO>;

    countByStatus(workerId: string, status: string): Promise<number>;

    countByShipment(shipmentId: string): Promise<number>;

    countByStatusForWorker(workerId: string, status: ShipmentParcelStatus): Promise<number>;

    countTodayForWorker(workerId: string, date: Date): Promise<number>;

    countPendingForWorker(workerId: string): Promise<number>;

    getGraphDataForWorker(workerId: string, filters: GetWorkerGraphRequestDTO): Promise<GetWorkerGraphResponseDTO>;
}