import { PricingPolicy } from "../../../../Domain/Entities/Admin/PricingPolicy";
import { PricingPolicySchemaType } from "../../../../Infrastructure/database/models/Admin/pricingPolicy";
import { IBaseRepository } from "../base.repository";

export interface IPricingPolicyRepository extends IBaseRepository<PricingPolicySchemaType> {

  getActiveByDeliveryModel(model: "AGENCY" | "TRAVELER"): Promise<PricingPolicy | null>;

  createPricingPolicy(policy: PricingPolicy): Promise<PricingPolicy>;

  deactivateActivePolicy(model: "AGENCY" | "TRAVELER"): Promise<void>;

  getLatestPolicyVersion(model: "AGENCY" | "TRAVELER"): Promise<number>
}
