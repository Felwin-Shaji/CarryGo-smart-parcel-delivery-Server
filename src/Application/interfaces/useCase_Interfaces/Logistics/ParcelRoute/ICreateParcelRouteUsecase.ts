import { CreateParcelRouteResponseDTO } from "@/Application/Dto/Agency/agencyParcelRoute.dto";

export interface ICreateParcelRouteUsecase {
    execute(bookingId:string): Promise<CreateParcelRouteResponseDTO>;
}