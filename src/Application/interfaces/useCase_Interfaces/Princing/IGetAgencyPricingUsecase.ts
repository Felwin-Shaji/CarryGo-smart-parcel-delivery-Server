import { AgencyPricingResponseDTO } from "../../../Dto/Pricing/AgencyPricing.dto";

export interface IGetAgencyPricingUsecase {
    execute(agencyId:string):Promise<AgencyPricingResponseDTO>
};