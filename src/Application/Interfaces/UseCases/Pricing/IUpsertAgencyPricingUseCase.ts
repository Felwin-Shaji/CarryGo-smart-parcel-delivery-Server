import { AgencyPricingResponseDTO, UpdateAgencyPricingDTO } from "../../../DTOs/Pricing/AgencyPricingDTO";

export interface IUpsertAgencyPricingUseCase {
    execute(agencyId: string, dto: UpdateAgencyPricingDTO): Promise<AgencyPricingResponseDTO>
}