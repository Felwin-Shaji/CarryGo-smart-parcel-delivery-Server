import { inject, injectable } from "tsyringe";
import { AdminPricingRequestDTO } from "../../Dto/Pricing/adminPricing.dto";
import { ICreateAdminPricingPolicyUseCase } from "../../interfaces/useCase_Interfaces/Princing/ICreateAdminPricingPolicyUseCase";
import { IPricingPolicyRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/pricingPolicy.repository";
import { PricingPolicy } from "../../../Domain/Entities/Admin/PricingPolicy";
import { AdminPricingPolicyMapper } from "../../Mappers/Pricing/AdminPricingPolicyMapper";

@injectable()
export class CreateAdminPricingPolicyUseCase implements ICreateAdminPricingPolicyUseCase {
    constructor(
        @inject("IPricingPolicyRepository") private readonly pricingPolicyRepo: IPricingPolicyRepository,
    ) { }

    async execute(dto: AdminPricingRequestDTO): Promise<PricingPolicy> {

        const latestVersion = await this.pricingPolicyRepo.getLatestPolicyVersion("AGENCY"); 

        await this.pricingPolicyRepo.deactivateActivePolicy("AGENCY");

        const newPolicy = AdminPricingPolicyMapper.toPricingPolicyDTO(dto, latestVersion);


        return await this.pricingPolicyRepo.createPricingPolicy(newPolicy);
    };
};