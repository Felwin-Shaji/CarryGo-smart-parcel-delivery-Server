import { PricingPolicy } from "../../Domain/Entities/Admin/PricingPolicy";
import { IPricingPolicyRepository } from "../../Application/interfaces/repositories_interfaces/adminRepositories_Interfaces/pricingPolicy.repository";

export async function bootstrapPricingPolicies(
  pricingRepo: IPricingPolicyRepository
): Promise<void> {

  const defaults = [
    {
      model: "AGENCY" as const,
      base: { min: 30, max: 100 },
      km: { min: 8, max: 20 },
      kg: { min: 2, max: 6 },
      fee: 10,
    },
    {
      model: "TRAVELER" as const,
      base: { min: 10, max: 50 },
      km: { min: 5, max: 15 },
      kg: { min: 1, max: 4 },
      fee: 5,
    },
  ];

  for (const d of defaults) {
    const exists = await pricingRepo.getActiveByDeliveryModel(d.model);
    if (!exists) {
      await pricingRepo.createPricingPolicy(
        new PricingPolicy(
          null,
          d.model,
          d.base.min,
          d.base.max,
          d.km.min,
          d.km.max,
          d.kg.min,
          d.kg.max,
          d.fee,
          true
        )
      );
    }
  }
}
