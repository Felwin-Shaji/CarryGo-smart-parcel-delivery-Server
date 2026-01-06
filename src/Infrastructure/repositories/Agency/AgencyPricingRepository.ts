import { Types } from "mongoose";
import { IAgencyPricingRepository } from "../../../Application/interfaces/repositories_interfaces/agencyRepositories_Interfaces/agencyPricing.repository";
import { AgencyPricing } from "../../../Domain/Entities/Agency/AgencyPricing";
import { AgencyPricingModel, AgencyPricingSchemaType } from "../../database/models/AgencyModels/agencyPricing.model";
import { BaseRepository } from "../baseRepositories";

export class AgencyPricingRepository extends BaseRepository<AgencyPricingSchemaType> implements IAgencyPricingRepository {
    constructor() {
        super(AgencyPricingModel)
    }

    async getPricingByAgency(agencyId: string, serviceType: "STANDARD" | "EXPRESS"): Promise<AgencyPricing | null> {

        const doc = await this.findOne({
            agencyId: new Types.ObjectId(agencyId),
            serviceType,
            isActive: true,
        });

        return doc ? this.toDomain(doc) : null;
    };

    /* */
    async upsertPricing(pricing: AgencyPricing): Promise<AgencyPricing> {

        const doc = await this.findOneAndUpdate(
            {
                agencyId: new Types.ObjectId(pricing.agencyId),
                serviceType: pricing.serviceType,
            },
            {
                basePrice: pricing.basePrice,
                pricePerKm: pricing.pricePerKm,
                sizePricing: pricing.sizePricing,
                isActive: pricing.isActive,
                policyVersion: pricing.policyVersion,
            }
        );

        if (doc) {
            return this.toDomain(doc);
        }

        const created = await this.save({
            agencyId: new Types.ObjectId(pricing.agencyId),
            serviceType: pricing.serviceType,
            basePrice: pricing.basePrice,
            pricePerKm: pricing.pricePerKm,
            sizePricing: pricing.sizePricing,
            isActive: pricing.isActive,
            policyVersion: pricing.policyVersion,
        });

        return this.toDomain(created);
    }


    private toDomain(doc: AgencyPricingSchemaType): AgencyPricing {
        return new AgencyPricing(
            doc._id.toString(),
            doc.agencyId.toString(),
            doc.serviceType,

            doc.basePrice,
            doc.pricePerKm,

            doc.sizePricing,

            doc.isActive,
            doc.policyVersion,

            doc.createdAt,
            doc.updatedAt
        );
    }

}