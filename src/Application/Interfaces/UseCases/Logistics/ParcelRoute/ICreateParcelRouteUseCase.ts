import { CreateParcelRouteResponseDTO } from "../../../../DTOs/Agency/AgencyParcelRouteDTO";

export interface ICreateParcelRouteUsecase {
    execute(bookingId:string): Promise<CreateParcelRouteResponseDTO>;
}