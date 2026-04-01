import { UpdateHubShipmentDTO } from "@/Application/Dto/Logistics/shipment.dto";

export interface IUpdateHubShipmentUsecase {
    execute(shipmentId: string, dto: UpdateHubShipmentDTO): Promise<void>;
}