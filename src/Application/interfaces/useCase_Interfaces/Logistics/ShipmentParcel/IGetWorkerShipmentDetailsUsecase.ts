import { WorkerShipmentDetails } from "@/Application/Dto/Logistics/shipment.dto";

export interface IGetWorkerShipmentDetailsUsecase {
    execute(shipmentId: string, page: number, limit: number): Promise<WorkerShipmentDetails>
}