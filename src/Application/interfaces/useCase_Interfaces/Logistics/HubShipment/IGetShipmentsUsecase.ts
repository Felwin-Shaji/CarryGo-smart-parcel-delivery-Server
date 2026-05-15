import { GetShipmentsDTO, GetShipmentsResponseDTO } from "../../../../Dto/Logistics/shipment.dto";

export interface IGetShipmentsUsecase {
    execute(hubId: string, dto: GetShipmentsDTO): Promise<GetShipmentsResponseDTO>
}