import { TripDetailsResponseDTO } from "../../../../DTOs/User/traveler.dto";

export interface IGetTravelerTripOverviewUseCase {  
  execute(userId: string, travelRequestId: string): Promise<TripDetailsResponseDTO>;
}
    