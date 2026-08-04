import { UpdateHubShipmentDTO } from "../../../../DTOs/Logistics/ShipmentDTO";

export interface IUpdateHubShipmentUsecase {
    execute(shipmentId: string, dto: UpdateHubShipmentDTO): Promise<void>;
}