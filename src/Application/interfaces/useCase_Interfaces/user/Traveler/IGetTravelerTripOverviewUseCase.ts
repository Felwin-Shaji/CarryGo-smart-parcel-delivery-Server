import { TripDetailsResponseDTO } from "../../../../Dto/User/traveler.dto";

export interface IGetTravelerTripOverviewUseCase {  
  execute(userId: string, travelRequestId: string): Promise<TripDetailsResponseDTO>;
}
    