import { GetShipmentsDTO, GetShipmentsResponseDTO } from "../../../DTOs/Logistics/ShipmentDTO";
import { IHubShipmentRepository } from "../../../Interfaces/Repositories/Logistics/IHubShipmentRepository";
import { IGetShipmentsUsecase } from "../../../Interfaces/UseCases/Logistics/HubShipment/IGetShipmentsUsecase";
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