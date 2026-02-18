import { inject, injectable } from "tsyringe";
import { ICreateAdminTravelerPricingUsecase } from "../../interfaces/useCase_Interfaces/Princing/ICreateAdminTravelerPricingUsecase";
import { IPricingPolicyRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/pricingPolicy.repository";
import { BasePricingPolicy } from "../../../Domain/Entities/Admin/BasePricingPolicy";
import { AdminTravelerPricingRequestDTO } from "../../Dto/Pricing/adminPricing.dto";
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