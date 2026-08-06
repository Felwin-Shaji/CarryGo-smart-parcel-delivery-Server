import { AgencyPricingResponseDTO } from "../../../DTOs/Pricing/AgencyPricingDTO";

export interface IGetAgencyPricingUsecase {
    execute(agencyId:string):Promise<AgencyPricingResponseDTO>
};