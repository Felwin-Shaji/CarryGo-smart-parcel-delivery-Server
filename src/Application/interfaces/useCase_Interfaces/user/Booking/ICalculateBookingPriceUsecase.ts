import { CalculatePriceRequestDTO, CalculatePriceResponseDTO } from "../../../../Dto/User/Booking.dto";

export interface ICalculateBookingPriceUsecase {
    execute(userId: string, dto: CalculatePriceRequestDTO): Promise<CalculatePriceResponseDTO>;
}