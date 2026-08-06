import { inject, injectable } from "tsyringe";
import { AdminPricingRequestDTO } from "../../DTOs/Pricing/AdminPricingDTO";
import { ICreateAdminPricingPolicyUseCase } from "../../Interfaces/UseCases/Pricing/ICreateAdminPricingPolicyUseCase";
import { IPricingPolicyRepository } from "../../Interfaces/Repositories/Admin/IPricingPolicyRepository";
import { AdminPricingPolicyMapper } from "../../Mappers/Pricing/AdminPricingPolicyMapper";
import { BasePricingPolicy } from "../../../Domain/Entities/Admin/BasePricingPolicy";
import { DeliveryPartner } from "../../../Domain/Enums/DeliveryPartnerType";

@injectable()
export class CreateAdminPricingPolicyUseCase implements ICreateAdminPricingPolicyUseCase {
    constructor(
        @inject("IPricingPolicyRepository") private readonly pricingPolicyRepo: IPricingPolicyRepository,
    ) { }

    async execute(dto: AdminPricingRequestDTO): Promise<BasePricingPolicy> {

        const latestVersion = await this.pricingPolicyRepo.getLatestPolicyVersion(DeliveryPartner.AGENCY);

        const newPolicy = AdminPricingPolicyMapper.toAgencyPricingPolicyDTO(dto, latestVersion);

        newPolicy.isActive = true;

        await this.pricingPolicyRepo.deactivateActivePolicy(DeliveryPartner.AGENCY);

        const createdPolicy = await this.pricingPolicyRepo.createPricingPolicy(newPolicy);

        return createdPolicy;
    }

};