import { inject, injectable } from "tsyringe";
import { IPricingPolicyRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/pricingPolicy.repository";
import { IAgencyPricingRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agencyPricing.repository";
import { IGetAgencyPricingUsecase } from "../../interfaces/useCase_Interfaces/Princing/IGetAgencyPricingUsecase";
import { PRICING_POLICY_MESSAGE } from "../../../Infrastructure/constants/messages/pricingPolicyMessage";
import { AppError } from "../../../Domain/utils/customError";
import { AgencyPricingResponseDTO } from "../../Dto/Pricing/AgencyPricing.dto";
import { AgencyPricingMapper } from "../../Mappers/Pricing/AgencyPricingMapper";
import { DeliveryPartner } from "../../../Domain/Enums/DeliveryPartnerType";
import { AgencyPricingPolicy } from "../../../Domain/Entities/Admin/AgencyPricingPolicy";

@injectable()
export class GetAgencyPricingUsecase implements IGetAgencyPricingUsecase {
    constructor(
        @inject("IPricingPolicyRepository") private readonly _pricingPolicyRepo: IPricingPolicyRepository,
        @inject("IAgencyPricingRepository") private readonly agencyPricingRepo: IAgencyPricingRepository
    ) { }

    async execute(agencyId: string): Promise<AgencyPricingResponseDTO> {

        const policy = await this._pricingPolicyRepo.getActiveByDeliveryModel(DeliveryPartner.AGENCY);
        if (!policy) throw new AppError(PRICING_POLICY_MESSAGE.ADMIN_PRICING_POLICY_NOT_FOUND);

        if (!(policy instanceof AgencyPricingPolicy)) throw new AppError(PRICING_POLICY_MESSAGE.INVALID_POLICY);

        const agencyPricing = await this.agencyPricingRepo.getPricingByAgency(agencyId, "STANDARD");

        if (agencyPricing) return {
            agencyPricing,
            policy,
            isOutdated: agencyPricing.policyVersion !== policy.policyVersion,
        };

        const defaultPricing = AgencyPricingMapper.toAdminDefaultPricing(agencyId, policy)

        return {
            agencyPricing: defaultPricing,
            policy,
            isOutdated: true,
        };

    }
}
