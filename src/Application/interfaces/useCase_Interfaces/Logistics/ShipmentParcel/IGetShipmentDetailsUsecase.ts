import { ShipmentParcelsPaginatedDTO } from "@/Application/Dto/Logistics/shipment.dto";

export interface IGetShipmentDetailsUsecase {
    execute(shipmentId: string, page: number, limit: number): Promise<ShipmentParcelsPaginatedDTO>;
}