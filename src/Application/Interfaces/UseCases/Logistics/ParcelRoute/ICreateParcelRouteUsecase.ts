import { CreateParcelRouteResponseDTO } from "../../../../DTOs/Agency/agencyParcelRoute.dto";

export interface ICreateParcelRouteUsecase {
    execute(bookingId:string): Promise<CreateParcelRouteResponseDTO>;
}