import { GetShipmentsDTO, GetShipmentsResponseDTO } from "../../../../DTOs/Logistics/ShipmentDTO";

export interface IGetShipmentsUsecase {
    execute(hubId: string, dto: GetShipmentsDTO): Promise<GetShipmentsResponseDTO>
}