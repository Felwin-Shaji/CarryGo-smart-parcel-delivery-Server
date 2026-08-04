import { PaginatedTravelRequestResponceDTO, TravelerRequestFilterDTO } from "../../../../DTOs/User/TravelerDTO";

export interface IGetTravelRequestsUseCase {
    execute(userId: string, dto: TravelerRequestFilterDTO): Promise<PaginatedTravelRequestResponceDTO>;
}
