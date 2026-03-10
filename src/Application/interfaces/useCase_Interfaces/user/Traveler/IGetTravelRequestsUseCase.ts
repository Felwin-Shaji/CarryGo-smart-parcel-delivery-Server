import { PaginatedTravelRequestResponceDTO, TravelerRequestFilterDTO } from "../../../../Dto/User/traveler.dto";

export interface IGetTravelRequestsUseCase {
    execute(userId: string, dto: TravelerRequestFilterDTO): Promise<PaginatedTravelRequestResponceDTO>;
}
