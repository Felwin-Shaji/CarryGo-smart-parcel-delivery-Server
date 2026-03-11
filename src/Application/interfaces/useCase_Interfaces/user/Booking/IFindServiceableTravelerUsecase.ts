import { CheckServiceableTravelerDTO, PaginationResponseDTO, ServiceableTravelerDTO } from "../../../../Dto/User/Booking.dto";

export interface IFindServiceableTravelerUsecase {
  execute(
    dto: CheckServiceableTravelerDTO
  ): Promise<PaginationResponseDTO<ServiceableTravelerDTO>>;
}