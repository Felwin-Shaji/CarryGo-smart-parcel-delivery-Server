import { WorkerShipmentDetails } from "../../../../DTOs/Logistics/ShipmentDTO";

export interface IGetWorkerShipmentDetailsUsecase {
    execute(shipmentId: string, page: number, limit: number): Promise<WorkerShipmentDetails>
}