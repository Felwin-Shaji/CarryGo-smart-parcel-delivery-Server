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
      size: { min: 2, max: 6 },
      fee: 10,
    },
    {
      model: "TRAVELER" as const,
      base: { min: 10, max: 50 },
      km: { min: 5, max: 15 },
      size: { min: 2, max: 6 },
      fee: 5,
    },
  ];

  for (const d of defaults) {
    const activePolicy =
      await pricingRepo.getActiveByDeliveryModel(d.model);

    if (!activePolicy) {
      const policy = new PricingPolicy(
        null,
        d.model,

        d.base.min,
        d.base.max,

        d.km.min,
        d.km.max,

        d.size.min,
        d.size.max,

        d.fee,
        true,
        1
      );

      await pricingRepo.createPricingPolicy(policy);
    }
  }
}
