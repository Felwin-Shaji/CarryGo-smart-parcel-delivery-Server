import { GetWorkerShipmentDTO } from "../../../../DTOs/Logistics/shipment.dto";
import { HubShipmentPaginatedData } from "../../../Repositories/Logistics/IHubShipmentRepository";

export interface IGetWorkersShipmentUsecase {
    execute(workerId:string, dto:GetWorkerShipmentDTO):Promise<HubShipmentPaginatedData>
}