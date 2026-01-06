import { AgencyPricing } from "../../../../Domain/Entities/Agency/AgencyPricing";
import { AgencyPricingResponseDTO, UpdateAgencyPricingDTO } from "../../../Dto/Pricing/AgencyPricing.dto";

export interface IUpsertAgencyPricingUseCase {
    execute(agencyId: string, dto: UpdateAgencyPricingDTO): Promise<AgencyPricingResponseDTO>
}