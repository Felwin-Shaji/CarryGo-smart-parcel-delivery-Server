import { inject, injectable } from "tsyringe";
import { ICreateAdminTravelerPricingUsecase } from "../../Interfaces/UseCases/Pricing/ICreateAdminTravelerPricingUsecase";
import { IPricingPolicyRepository } from "../../Interfaces/Repositories/Admin/IPricingPolicyRepository";
import { BasePricingPolicy } from "../../../Domain/Entities/Admin/BasePricingPolicy";
import { AdminTravelerPricingRequestDTO } from "../../DTOs/Pricing/adminPricing.dto";
import { DeliveryPartner } from "../../../Domain/Enums/DeliveryPartnerType";
import { AdminPricingPolicyMapper } from "../../Mappers/Pricing/AdminPricingPolicyMapper";


@injectable()
export class CreateAdminTravelerPricingUsecase implements ICreateAdminTravelerPricingUsecase {
    constructor(
        @inject("IPricingPolicyRepository") private readonly pricingPolicyRepo: IPricingPolicyRepository,
    ) { }

    async execute(dto: AdminTravelerPricingRequestDTO): Promise<BasePricingPolicy> {

        const latestVersion = await this.pricingPolicyRepo.getLatestPolicyVersion(DeliveryPartner.TRAVELER);

        await this.pricingPolicyRepo.deactivateActivePolicy(DeliveryPartner.TRAVELER);

        const newPolicy = AdminPricingPolicyMapper.toTravelerPricingPolicy(dto, latestVersion);
        newPolicy.isActive = true;
        const createdPolicy = await this.pricingPolicyRepo.createPricingPolicy(newPolicy);

        return createdPolicy;
    }

}