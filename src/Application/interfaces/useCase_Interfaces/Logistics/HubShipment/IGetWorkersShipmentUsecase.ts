import { GetWorkerShipmentDTO } from "../../../../Dto/Logistics/shipment.dto";
import { HubShipmentPaginatedData } from "../../../repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";

export interface IGetWorkersShipmentUsecase {
    execute(workerId:string, dto:GetWorkerShipmentDTO):Promise<HubShipmentPaginatedData>
}