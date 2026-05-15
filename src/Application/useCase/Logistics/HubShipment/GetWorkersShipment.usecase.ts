import { GetWorkerShipmentDTO } from "../../../Dto/Logistics/shipment.dto";
import {   HubShipmentPaginatedData, IHubShipmentRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IGetWorkersShipmentUsecase } from "../../../interfaces/useCase_Interfaces/Logistics/HubShipment/IGetWorkersShipmentUsecase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetWorkersShipmentUsecase implements IGetWorkersShipmentUsecase {
    constructor(
        @inject("IHubShipmentRepository") private _hubShipmentRepo: IHubShipmentRepository

    ) { }
    async execute(workerId: string, dto: GetWorkerShipmentDTO): Promise<HubShipmentPaginatedData> {
        return this._hubShipmentRepo.getPaginatedShipmentsForWorker(workerId, dto);
    }
} 