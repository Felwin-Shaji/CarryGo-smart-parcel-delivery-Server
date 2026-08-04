import { BasePricingPolicy } from "../../../../../../Domain/Entities/Admin/BasePricingPolicy";
import { CalculatePriceRequestDTO, CalculatePriceResponseDTO } from "../../../../../DTOs/User/BookingDTO";

export interface ICalculatePriceUsecase {
    execute(policy: BasePricingPolicy, dto: CalculatePriceRequestDTO, distanceKm: number): Promise<CalculatePriceResponseDTO>;
}