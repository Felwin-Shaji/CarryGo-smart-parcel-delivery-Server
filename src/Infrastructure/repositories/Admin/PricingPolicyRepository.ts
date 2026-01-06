import { IPricingPolicyRepository } from "../../../Application/interfaces/repositories_interfaces/adminRepositories_Interfaces/pricingPolicy.repository";
import { PricingPolicy } from "../../../Domain/Entities/Admin/PricingPolicy";
import { AppError } from "../../../Domain/utils/customError";
import { PricingPolicyModel, PricingPolicySchemaType } from "../../database/models/Admin/pricingPolicy";
import { BaseRepository } from "../baseRepositories";

export class PricingPolicyRepository
    extends BaseRepository<PricingPolicySchemaType>
    implements IPricingPolicyRepository {

    constructor() {
        super(PricingPolicyModel);
    };

    async createPricingPolicy(policy: PricingPolicy): Promise<PricingPolicy> {
        const pricingPolicyDocument = {
            deliveryModel: policy.deliveryModel,

            minBasePrice: policy.minBasePrice,
            maxBasePrice: policy.maxBasePrice,

            minPricePerKm: policy.minPricePerKm,
            maxPricePerKm: policy.maxPricePerKm,

            minSizePrice: policy.minSizePrice,
            maxSizePrice: policy.maxSizePrice,

            platformFeePercent: policy.platformFeePercent,
            isActive: policy.isActive,
            policyVersion: policy.policyVersion

        };

        const doc = await this.save(pricingPolicyDocument);
        return this.toDomain(doc)
    };

    async getActiveByDeliveryModel(model: "AGENCY" | "TRAVELER"): Promise<PricingPolicy | null> {

        const doc = await this.findOne({
            deliveryModel: model,
            isActive: true,
        });

        return doc ? this.toDomain(doc) : null;
    };

    async deactivateActivePolicy(model: "AGENCY" | "TRAVELER"): Promise<void> {
        await this.model.updateMany(
            { deliveryModel: model, isActive: true },
            { isActive: false }
        );
    };

    async getLatestPolicyVersion(model: "AGENCY" | "TRAVELER"): Promise<number> {
        const doc = await this.model.findOne(
            { deliveryModel: model },
            { policyVersion: 1 },
            { sort: { policyVersion: -1 } }
        );

        return doc?.policyVersion ?? 0;
    };

    /* 
    MAPPER
    */
    private toDomain(doc: PricingPolicySchemaType): PricingPolicy {
        return new PricingPolicy(
            doc._id.toString(),
            doc.deliveryModel,

            doc.minBasePrice,
            doc.maxBasePrice,

            doc.minPricePerKm,
            doc.maxPricePerKm,

            doc.minSizePrice,
            doc.maxSizePrice,

            doc.platformFeePercent,
            doc.isActive,
            doc.policyVersion,

            doc.createdAt,
            doc.updatedAt
        );
    };
};
