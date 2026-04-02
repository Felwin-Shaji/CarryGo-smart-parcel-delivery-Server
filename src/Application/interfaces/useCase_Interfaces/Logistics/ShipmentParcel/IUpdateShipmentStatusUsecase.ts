import { ShipmentStatus } from "@/Domain/Entities/Logistics/HubShipment";

export interface IUpdateShipmentStatusUsecase {
    execute(shipmentId: string, status: ShipmentStatus): Promise<void>;
}