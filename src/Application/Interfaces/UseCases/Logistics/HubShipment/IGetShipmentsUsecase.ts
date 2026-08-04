import { GetShipmentsDTO, GetShipmentsResponseDTO } from "../../../../DTOs/Logistics/shipment.dto";

export interface IGetShipmentsUsecase {
    execute(hubId: string, dto: GetShipmentsDTO): Promise<GetShipmentsResponseDTO>
}