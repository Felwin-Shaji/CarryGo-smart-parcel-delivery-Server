import { GetWorkerShipmentDTO } from "../../../../DTOs/Logistics/ShipmentDTO";
import { HubShipmentPaginatedData } from "../../../Repositories/Logistics/IHubShipmentRepository";

export interface IGetWorkersShipmentUsecase {
    execute(workerId:string, dto:GetWorkerShipmentDTO):Promise<HubShipmentPaginatedData>
}