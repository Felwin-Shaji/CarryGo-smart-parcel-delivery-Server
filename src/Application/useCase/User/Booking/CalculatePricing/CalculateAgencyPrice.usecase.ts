import { inject, injectable } from "tsyringe";
import { AgencyPricingPolicy } from "../../../../../Domain/Entities/Admin/AgencyPricingPolicy";
import { BasePricingPolicy } from "../../../../../Domain/Entities/Admin/BasePricingPolicy";
import { AppError } from "../../../../../Domain/utils/customError";
import { AGENCY_MESSAGES } from "../../../../../Infrastructure/constants/messages/agencyMessages";
import { PRICING_POLICY_MESSAGE } from "../../../../../Infrastructure/constants/messages/pricingPolicyMessage";
import { STATUS } from "../../../../../Infrastructure/constants/statusCodes";
import { CalculatePriceRequestDTO, CalculatePriceResponseDTO } from "../../../../Dto/User/Booking.dto";
import { ICalculatePriceUsecase } from "../../../../interfaces/useCase_Interfaces/user/Booking/CalculatePricing/ICalculatePrice";
import { IAgencyPricingRepository } from "../../../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agencyPricing.repository";
import { IPricingPolicyRepository } from "../../../../interfaces/repositories_interfaces/adminRepositories_Interfaces/pricingPolicy.repository";
import { DeliveryPartner } from "../../../../../Domain/Enums/DeliveryPartnerType";
import { USER_MESSAGES } from "../../../../../Infrastructure/constants/messages/userMessage";

@injectable()
export class CalculateAgencyPriceUsecase implements ICalculatePriceUsecase {
    constructor(
        @inject("IAgencyPricingRepository") private _agencyPricingRepository: IAgencyPricingRepository,
        @inject("IPricingPolicyRepository") private _pricingPolicyRepository: IPricingPolicyRepository,
    ) { }
    async execute(
  policy: BasePricingPolicy,
  dto: CalculatePriceRequestDTO,
  distanceKm: number
): Promise<CalculatePriceResponseDTO> {

  if (!(policy instanceof AgencyPricingPolicy))
    throw new AppError(PRICING_POLICY_MESSAGE.INVALID_POLICY);

  const { partnerId, packageDetails } = dto;
  if (!partnerId)
    throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

  const adminPricing =
    await this._pricingPolicyRepository.getActiveByDeliveryModel(
      DeliveryPartner.AGENCY
    );

  const agencyPricing =
    await this._agencyPricingRepository.getPricingByAgency(partnerId, "STANDARD");

  if (!agencyPricing)
    throw new AppError(AGENCY_MESSAGES.PRICING_NOT_FOUND);

  if (adminPricing?.policyVersion !== agencyPricing.policyVersion)
    throw new AppError(
      AGENCY_MESSAGES.PRICING_NOT_UPDATED,
      STATUS.SERVICE_UNAVAILABLE
    );

  const basePrice = agencyPricing.basePrice;
  const pricePerKm = agencyPricing.pricePerKm;
  const pricePerKg = agencyPricing.pricePerKg;

  const distanceCharge = distanceKm * pricePerKm;

  const { lengthCm, widthCm, heightCm } = packageDetails.dimensions;

  const volumetricWeight =
    (lengthCm * widthCm * heightCm) / 5000;

  const chargeableWeight = Math.max(
    packageDetails.weightKg,
    volumetricWeight
  );

  const weightCharge = chargeableWeight * pricePerKg;

  const subTotal = basePrice + distanceCharge + weightCharge;

  const platformFee =
    (subTotal * policy.platformFeePercent) / 100;

  const totalPrice = Math.round(subTotal + platformFee);

  return {
    distanceKm: this.round(distanceKm),
    basePrice: this.round(basePrice),
    distanceCharge: this.round(distanceCharge),
    volumetricCharge: this.round(weightCharge), // renamed logically but keeping response structure
    platformFee: this.round(platformFee),
    totalPrice,
    currency: "INR",
  };
}
    private round(n: number) { return Math.round(n * 100) / 100; }
}