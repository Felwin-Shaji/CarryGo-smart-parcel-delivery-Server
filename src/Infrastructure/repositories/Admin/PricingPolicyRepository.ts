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
            minPricePerKg: policy.minPricePerKg,
            maxPricePerKg: policy.maxPricePerKg,
            platformFeePercent: policy.platformFeePercent,
            isActive: policy.isActive
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


    async updatePricingPolicy(policy: PricingPolicy): Promise<PricingPolicy> {

        const doc = await this.findOneAndUpdate(
            { deliveryModel: policy.deliveryModel },
            {
                minBasePrice: policy.minBasePrice,
                maxBasePrice: policy.maxBasePrice,
                minPricePerKm: policy.minPricePerKm,
                maxPricePerKm: policy.maxPricePerKm,
                minPricePerKg: policy.minPricePerKg,
                maxPricePerKg: policy.maxPricePerKg,
                platformFeePercent: policy.platformFeePercent,
                isActive: policy.isActive,
            }
        );

        if (!doc) {
            throw new AppError("Pricing policy not found");
        };

        return this.toDomain(doc);
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

            doc.minPricePerKg,
            doc.maxPricePerKg,

            doc.platformFeePercent,
            doc.isActive,

            doc.createdAt,
            doc.updatedAt
        );
    };
};
