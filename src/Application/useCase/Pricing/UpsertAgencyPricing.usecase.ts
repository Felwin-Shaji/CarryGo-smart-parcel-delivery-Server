import { inject, injectable } from "tsyringe";
import { IUpsertAgencyPricingUseCase } from "../../interfaces/useCase_Interfaces/Princing/IUpsertAgencyPricingUseCase";
import { AgencyPricing } from "../../../Domain/Entities/Agency/AgencyPricing";
import { AgencyPricingResponseDTO, UpdateAgencyPricingDTO } from "../../Dto/Pricing/AgencyPricing.dto";
import { IPricingPolicyRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/pricingPolicy.repository";
import { IAgencyPricingRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agencyPricing.repository";
import { AppError } from "../../../Domain/utils/customError";
import { PRICING_POLICY_MESSAGE } from "../../../Infrastructure/constants/messages/pricingPolicyMessage";
import { AgencyPricingMapper } from "../../Mappers/Pricing/AgencyPricingMapper";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";

@injectable()
export class UpsertAgencyPricingUseCase implements IUpsertAgencyPricingUseCase {
    constructor(
        @inject("IPricingPolicyRepository") private readonly pricingPolicyRepo: IPricingPolicyRepository,
        @inject("IAgencyPricingRepository") private readonly agencyPricingRepo: IAgencyPricingRepository
    ) { };

    async execute(agencyId: string, dto: UpdateAgencyPricingDTO): Promise<AgencyPricingResponseDTO> {

        const policy = await this.pricingPolicyRepo.getActiveByDeliveryModel("AGENCY");

        if (!policy) throw new AppError(PRICING_POLICY_MESSAGE.ADMIN_PRICING_POLICY_NOT_FOUND, STATUS.NOT_FOUND);

        if (
            dto.basePrice < policy.minBasePrice ||
            dto.basePrice > policy.maxBasePrice
        ) {
            throw new AppError(PRICING_POLICY_MESSAGE.BASE_PRICE_OUTSIDE_LIMIT, STATUS.BAD_REQUEST);
        };

        for (const [size, config] of Object.entries(dto.sizePricing)) {
            if (
                config.price < policy.minSizePrice ||
                config.price > policy.maxSizePrice
            ) {
                throw new AppError(
                    PRICING_POLICY_MESSAGE.SIZE_PRICE_OUTSIDE_LIMIT,
                    STATUS.BAD_REQUEST
                );
            }
        }

        const agencyPricing =
            AgencyPricingMapper.toAgencyPricingDTO(
                agencyId,
                dto,
                policy.policyVersion
            );

        const updatedPricing = await this.agencyPricingRepo.upsertPricing(agencyPricing);

        return {
            agencyPricing: updatedPricing,
            policy,
            isOutdated: updatedPricing.policyVersion === policy.policyVersion
        }

    }
}