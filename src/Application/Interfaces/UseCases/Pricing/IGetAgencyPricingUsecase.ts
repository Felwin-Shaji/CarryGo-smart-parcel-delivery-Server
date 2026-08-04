import { AgencyPricingResponseDTO } from "../../../DTOs/Pricing/AgencyPricing.dto";

export interface IGetAgencyPricingUsecase {
    execute(agencyId:string):Promise<AgencyPricingResponseDTO>
};