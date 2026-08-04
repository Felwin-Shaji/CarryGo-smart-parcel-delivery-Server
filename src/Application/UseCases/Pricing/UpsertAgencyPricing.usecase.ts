import { inject, injectable } from "tsyringe";
import { IUpsertAgencyPricingUseCase } from "../../Interfaces/UseCases/Pricing/IUpsertAgencyPricingUseCase";
import { AgencyPricingResponseDTO, UpdateAgencyPricingDTO } from "../../DTOs/Pricing/AgencyPricing.dto";
import { IPricingPolicyRepository } from "../../Interfaces/Repositories/Admin/IPricingPolicyRepository";
import { IAgencyPricingRepository } from "../../Interfaces/Repositories/Agency/agencyPricing.repository";
import { AppError } from "../../../Domain/Utils/customError";
import { PRICING_POLICY_MESSAGE } from "../../../Infrastructure/Constants/Messages/pricingPolicyMessage";
import { AgencyPricingMapper } from "../../Mappers/Pricing/AgencyPricingMapper";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { DeliveryPartner } from "../../../Domain/Enums/DeliveryPartnerType";
import { AgencyPricingPolicy } from "../../../Domain/Entities/Admin/AgencyPricingPolicy";

@injectable()
export class UpsertAgencyPricingUseCase implements IUpsertAgencyPricingUseCase {
  constructor(
    @inject("IPricingPolicyRepository")
    private readonly pricingPolicyRepo: IPricingPolicyRepository,

    @inject("IAgencyPricingRepository")
    private readonly agencyPricingRepo: IAgencyPricingRepository
  ) { }

  async execute(
    agencyId: string,
    dto: UpdateAgencyPricingDTO
  ): Promise<AgencyPricingResponseDTO> {
    const policy =
      await this.pricingPolicyRepo.getActiveByDeliveryModel(
        DeliveryPartner.AGENCY
      );

    if (!policy)
      throw new AppError(
        PRICING_POLICY_MESSAGE.ADMIN_PRICING_POLICY_NOT_FOUND,
        STATUS.NOT_FOUND
      );

    if (!(policy instanceof AgencyPricingPolicy))
      throw new AppError(
        PRICING_POLICY_MESSAGE.INVALID_POLICY,
        STATUS.BAD_REQUEST
      );

    // Base price validation
    if (
      dto.basePrice < policy.minBasePrice ||
      dto.basePrice > policy.maxBasePrice
    ) {
      throw new AppError(
        PRICING_POLICY_MESSAGE.BASE_PRICE_OUTSIDE_LIMIT,
        STATUS.BAD_REQUEST
      );
    }

    // Price per km validation
    if (
      dto.pricePerKm < policy.minPricePerKm ||
      dto.pricePerKm > policy.maxPricePerKm
    ) {
      throw new AppError(
        PRICING_POLICY_MESSAGE.PRICE_PER_KM_OUTSIDE_LIMIT,
        STATUS.BAD_REQUEST
      );
    }

    // Price per kg validation
    if (
      dto.pricePerKg < policy.minPricePerKg ||
      dto.pricePerKg > policy.maxPricePerKg
    ) {
      throw new AppError(
        PRICING_POLICY_MESSAGE.PRICE_PER_KG_OUTSIDE_LIMIT,
        STATUS.BAD_REQUEST
      );
    }

    const agencyPricing =
      AgencyPricingMapper.toAgencyPricingDTO(
        agencyId,
        dto,
        policy.policyVersion
      );

    const updatedPricing =
      await this.agencyPricingRepo.upsertPricing(agencyPricing);

    return {
      agencyPricing: updatedPricing,
      policy,
      isOutdated: updatedPricing.policyVersion !== policy.policyVersion,
    };
  }
}