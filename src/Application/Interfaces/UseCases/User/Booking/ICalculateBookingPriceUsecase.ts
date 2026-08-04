import { CalculatePriceRequestDTO, CalculatePriceResponseDTO } from "../../../../DTOs/User/BookingDTO";

export interface ICalculateBookingPriceUsecase {
    execute(userId: string, dto: CalculatePriceRequestDTO): Promise<CalculatePriceResponseDTO>;
}