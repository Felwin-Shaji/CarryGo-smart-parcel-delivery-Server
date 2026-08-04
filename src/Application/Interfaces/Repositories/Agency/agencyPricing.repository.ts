import { AgencyPricing } from "../../../../Domain/Entities/Agency/AgencyPricing";
import { AgencyPricingSchemaType } from "../../../../Infrastructure/database/models/AgencyModels/agencyPricing.model";
import { IBaseRepository } from "../base.repository";

export interface IAgencyPricingRepository extends IBaseRepository<AgencyPricingSchemaType> {
    getPricingByAgency(agencyId: string, serviceType: "STANDARD" | "EXPRESS"): Promise<AgencyPricing | null>;

    upsertPricing(pricing: AgencyPricing): Promise<AgencyPricing>;
}