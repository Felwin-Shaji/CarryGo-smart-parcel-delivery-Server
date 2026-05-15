import { GetShipmentsDTO, GetShipmentsResponseDTO } from "../../../Dto/Logistics/shipment.dto";
import { IHubShipmentRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IGetShipmentsUsecase } from "../../../interfaces/useCase_Interfaces/Logistics/HubShipment/IGetShipmentsUsecase";
import { HubShipmentMapper } from "../../../Mappers/Logistics/HubShipmentMapper";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetShipmentsUsecase implements IGetShipmentsUsecase {

    constructor(
        @inject("IHubShipmentRepository") private _hubShipmentRepo: IHubShipmentRepository
    ) { }

    async execute(hubId: string, dto: GetShipmentsDTO): Promise<GetShipmentsResponseDTO> {

        const shipments = await this._hubShipmentRepo.getPaginatedShipments(hubId, dto);

        return HubShipmentMapper.toGetPaginatedHubShipmentsResponse(shipments);
    }
}