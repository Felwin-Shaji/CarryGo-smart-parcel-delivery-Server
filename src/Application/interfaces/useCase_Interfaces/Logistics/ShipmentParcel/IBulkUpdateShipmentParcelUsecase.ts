import { ShipmentParcelStatus } from "@/Domain/Entities/Logistics/ShipmentParcel";

export interface IBulkUpdateShipmentParcelUsecase {
    execute(shipmentId: string, parcelIds: string[], status: ShipmentParcelStatus): Promise<void>;
}