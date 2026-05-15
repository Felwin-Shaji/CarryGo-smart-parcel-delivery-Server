import { UpdateHubShipmentDTO } from "../../../Dto/Logistics/shipment.dto";
import { IHubShipmentRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IUpdateHubShipmentUsecase } from "../../../interfaces/useCase_Interfaces/Logistics/HubShipment/IUpdateHubShipmentUsecase";
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