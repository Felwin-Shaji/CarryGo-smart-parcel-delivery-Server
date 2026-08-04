import { CalculatePriceRequestDTO, CalculatePriceResponseDTO } from "../../../../DTOs/User/Booking.dto";

export interface ICalculateBookingPriceUsecase {
    execute(userId: string, dto: CalculatePriceRequestDTO): Promise<CalculatePriceResponseDTO>;
}