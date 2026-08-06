import { CheckServiceableTravelerDTO, PaginationResponseDTO, ServiceableTravelerDTO } from "../../../../DTOs/User/BookingDTO";

export interface IFindServiceableTravelerUsecase {
  execute(
    userId:string,
    dto: CheckServiceableTravelerDTO
  ): Promise<PaginationResponseDTO<ServiceableTravelerDTO>>;
}