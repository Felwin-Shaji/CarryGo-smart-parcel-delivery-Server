import { BasePricingPolicy } from "../../../../../../Domain/Entities/Admin/BasePricingPolicy";
import { CalculatePriceRequestDTO, CalculatePriceResponseDTO } from "../../../../../Dto/User/Booking.dto";

export interface ICalculatePriceUsecase {
    execute(policy: BasePricingPolicy, dto: CalculatePriceRequestDTO, distanceKm: number): Promise<CalculatePriceResponseDTO>;
}