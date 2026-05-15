import { WorkerShipmentDetails } from "../../../../Dto/Logistics/shipment.dto";

export interface IGetWorkerShipmentDetailsUsecase {
    execute(shipmentId: string, page: number, limit: number): Promise<WorkerShipmentDetails>
}