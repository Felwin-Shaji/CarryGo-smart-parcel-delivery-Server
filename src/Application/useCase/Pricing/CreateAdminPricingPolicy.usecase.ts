import { inject, injectable } from "tsyringe";
import { AdminPricingRequestDTO } from "../../Dto/Pricing/adminPricing.dto";
import { ICreateAdminPricingPolicyUseCase } from "../../interfaces/useCase_Interfaces/Princing/ICreateAdminPricingPolicyUseCase";
import { IPricingPolicyRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/pricingPolicy.repository";
import { AdminPricingPolicyMapper } from "../../Mappers/Pricing/AdminPricingPolicyMapper";
import { BasePricingPolicy } from "../../../Domain/Entities/Admin/BasePricingPolicy";
import { DeliveryPartner } from "../../../Domain/Enums/DeliveryPartnerType";

@injectable()
export class CreateAdminPricingPolicyUseCase implements ICreateAdminPricingPolicyUseCase {
    constructor(
        @inject("IPricingPolicyRepository") private readonly pricingPolicyRepo: IPricingPolicyRepository,
    ) { }

    async execute(dto: AdminPricingRequestDTO): Promise<BasePricingPolicy> {

        const latestVersion =await this.pricingPolicyRepo.getLatestPolicyVersion(DeliveryPartner.AGENCY);

        const newPolicy = AdminPricingPolicyMapper.toAgencyPricingPolicyDTO(dto, latestVersion);

        const createdPolicy = await this.pricingPolicyRepo.createPricingPolicy(newPolicy);

        await this.pricingPolicyRepo.deactivateActivePolicy(DeliveryPartner.AGENCY);

        return createdPolicy;
    }

};