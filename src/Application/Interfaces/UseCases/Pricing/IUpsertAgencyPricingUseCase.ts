import { AgencyPricingResponseDTO, UpdateAgencyPricingDTO } from "../../../DTOs/Pricing/AgencyPricing.dto";

export interface IUpsertAgencyPricingUseCase {
    execute(agencyId: string, dto: UpdateAgencyPricingDTO): Promise<AgencyPricingResponseDTO>
}