import { GetWorkerShipmentDTO } from "@/Application/Dto/Logistics/shipment.dto";
import { HubShipmentPaginatedData } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";

export interface IGetWorkersShipmentUsecase {
    execute(workerId:string, dto:GetWorkerShipmentDTO):Promise<HubShipmentPaginatedData>
}