import { UpdateHubShipmentDTO } from "../../../DTOs/Logistics/ShipmentDTO";
import { IHubShipmentRepository } from "../../../Interfaces/Repositories/Logistics/IHubShipmentRepository";
import { IUpdateHubShipmentUsecase } from "../../../Interfaces/UseCases/Logistics/HubShipment/IUpdateHubShipmentUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateHubShipmentUsecase implements IUpdateHubShipmentUsecase {
    constructor(
        @inject("IHubShipmentRepository") private _hubShipmentRepository: IHubShipmentRepository,

    ) { }

    async execute(shipmentId: string, dto: UpdateHubShipmentDTO): Promise<void> {

        await this._hubShipmentRepository.findOneAndUpdate(
            { _id: shipmentId },
            {
                estimatedDispatchAt: new Date(dto.estimatedDispatchAt),
                assignedWorkerId: dto.workerId,
                capacity: dto.capacity
            }
        );
    }
}