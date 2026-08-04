import { GetWorkerShipmentDTO } from "../../../DTOs/Logistics/shipment.dto";
import {   HubShipmentPaginatedData, IHubShipmentRepository } from "../../../Interfaces/Repositories/Logistics/IHubShipmentRepository";
import { IGetWorkersShipmentUsecase } from "../../../Interfaces/UseCases/Logistics/HubShipment/IGetWorkersShipmentUsecase";
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