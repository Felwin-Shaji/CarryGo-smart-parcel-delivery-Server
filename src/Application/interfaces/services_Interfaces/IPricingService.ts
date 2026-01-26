import { CalculatePriceRequestDTO } from "../../Dto/User/Booking.dto";
import { CalculatePriceResponseDTO } from "../../Dto/User/Booking.dto";

export interface IPricingService {
  calculate(
    userId: string,
    dto: CalculatePriceRequestDTO
  ): Promise<CalculatePriceResponseDTO>;
}
