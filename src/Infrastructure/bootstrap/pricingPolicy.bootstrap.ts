import { AgencyPricingPolicy } from "../../Domain/Entities/Admin/AgencyPricingPolicy";
import { IPricingPolicyRepository } from "../../Application/interfaces/repositories_interfaces/adminRepositories_Interfaces/IPricingPolicyRepository";
import { DeliveryPartner } from "../../Domain/Enums/DeliveryPartnerType";
import { TravelerPricingPolicy } from "../../Domain/Entities/Admin/TravelerPricingPolicy";

export async function bootstrapPricingPolicies(
  pricingRepo: IPricingPolicyRepository
): Promise<void> {


  const agencyDefault = {
    minBasePrice: 30,
    maxBasePrice: 100,
    minPricePerKm: 8,
    maxPricePerKm: 20,
    minSizePrice: 2,
    maxSizePrice: 6,
    platformFeePercent: 10,
  };

  const travelerDefault = {
    basePrice: 20,
    pricePerKm: 4,

    basePricePerKg: 25,

    transportMultipliers: {
      FLIGHT: 1.5,
      TRAIN: 1.2,
      CAR: 1.1,
      BUS: 1.0,
      BIKE: 0.8,
    },

    platformFeePercent: 5,
  };



  const activeAgency =
    await pricingRepo.getActiveByDeliveryModel(DeliveryPartner.AGENCY);

  if (!activeAgency) {
    const agencyPolicy = new AgencyPricingPolicy(
      null,
      agencyDefault.minBasePrice,
      agencyDefault.maxBasePrice,
      agencyDefault.minPricePerKm,
      agencyDefault.maxPricePerKm,
      agencyDefault.minSizePrice,
      agencyDefault.maxSizePrice,
      agencyDefault.platformFeePercent,
      true,
      1
    );


    await pricingRepo.createPricingPolicy(agencyPolicy);
  }

  const activeTraveler =
    await pricingRepo.getActiveByDeliveryModel(DeliveryPartner.TRAVELER);

  if (!activeTraveler) {
    const travelerPolicy = new TravelerPricingPolicy(
      null,

      travelerDefault.basePrice,
      travelerDefault.pricePerKm,

      travelerDefault.basePricePerKg,

      travelerDefault.transportMultipliers,

      travelerDefault.platformFeePercent,
      true,
      1
    );

    await pricingRepo.createPricingPolicy(travelerPolicy);
  }
}
