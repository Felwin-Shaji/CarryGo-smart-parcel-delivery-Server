import { CreateParcelRouteResponseDTO } from "../../../../Dto/Agency/agencyParcelRoute.dto";

export interface ICreateParcelRouteUsecase {
    execute(bookingId:string): Promise<CreateParcelRouteResponseDTO>;
}