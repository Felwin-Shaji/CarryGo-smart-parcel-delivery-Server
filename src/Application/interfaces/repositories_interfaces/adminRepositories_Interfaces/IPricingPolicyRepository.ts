import { BasePricingPolicy } from "../../../../Domain/Entities/Admin/BasePricingPolicy";
import { BasePricingPolicySchemaType } from "../../../../Infrastructure/database/models/Admin/Pricing/BasePricingPolicySchema";
import { IBaseRepository } from "../base.repository";

export interface IPricingPolicyRepository extends IBaseRepository<BasePricingPolicySchemaType> {

  getActiveByDeliveryModel(model: "AGENCY" | "TRAVELER"): Promise<BasePricingPolicy | null>;

  createPricingPolicy(policy: BasePricingPolicy): Promise<BasePricingPolicy>;

  deactivateActivePolicy(model: "AGENCY" | "TRAVELER"): Promise<void>;

  getLatestPolicyVersion(model: "AGENCY" | "TRAVELER"): Promise<number>
}
