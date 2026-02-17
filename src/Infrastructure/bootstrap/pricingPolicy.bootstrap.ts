import { AgencyPricingPolicy } from "../../Domain/Entities/Admin/AgencyPricingPolicy";
import { IPricingPolicyRepository } from "../../Application/interfaces/repositories_interfaces/adminRepositories_Interfaces/pricingPolicy.repository";
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
    basePricePerKg: 25,

    flightMultiplier: 1.5,
    trainMultiplier: 1.2,
    carMultiplier: 1.1,
    busMultiplier: 1.0,
    bikeMultiplier: 0.8,

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
      travelerDefault.basePricePerKg,
      travelerDefault.flightMultiplier,
      travelerDefault.trainMultiplier,
      travelerDefault.carMultiplier,
      travelerDefault.busMultiplier,
      travelerDefault.bikeMultiplier,
      travelerDefault.platformFeePercent,
      true,
      1
    );

    await pricingRepo.createPricingPolicy(travelerPolicy);
  }
}
