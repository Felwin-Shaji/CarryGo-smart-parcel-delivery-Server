import { CheckServiceableTravelerDTO, PaginationResponseDTO, ServiceableTravelerDTO } from "../../../../DTOs/User/Booking.dto";

export interface IFindServiceableTravelerUsecase {
  execute(
    userId:string,
    dto: CheckServiceableTravelerDTO
  ): Promise<PaginationResponseDTO<ServiceableTravelerDTO>>;
}