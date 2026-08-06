import { AgencyPricing } from "../../../../Domain/Entities/Agency/AgencyPricing";
import { AgencyPricingSchemaType } from "../../../../Infrastructure/Database/Models/Agency/AgencyPricingModel";
import { IBaseRepository } from "../IBaseRepository";

export interface IAgencyPricingRepository extends IBaseRepository<AgencyPricingSchemaType> {
    getPricingByAgency(agencyId: string, serviceType: "STANDARD" | "EXPRESS"): Promise<AgencyPricing | null>;

    upsertPricing(pricing: AgencyPricing): Promise<AgencyPricing>;
}