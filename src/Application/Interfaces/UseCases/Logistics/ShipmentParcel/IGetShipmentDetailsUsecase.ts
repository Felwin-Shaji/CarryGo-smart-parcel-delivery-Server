import { ShipmentParcelsPaginatedDTO } from "../../../../DTOs/Logistics/ShipmentDTO";

export interface IGetShipmentDetailsUsecase {
    execute(shipmentId: string, page: number, limit: number): Promise<ShipmentParcelsPaginatedDTO>;
}