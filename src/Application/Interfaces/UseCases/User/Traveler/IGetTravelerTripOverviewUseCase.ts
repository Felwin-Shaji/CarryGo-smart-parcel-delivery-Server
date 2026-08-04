import { TripDetailsResponseDTO } from "../../../../DTOs/User/TravelerDTO";

export interface IGetTravelerTripOverviewUseCase {  
  execute(userId: string, travelRequestId: string): Promise<TripDetailsResponseDTO>;
}
    