import { IPricingPolicyRepository } from "../../../Application/interfaces/repositories_interfaces/adminRepositories_Interfaces/IPricingPolicyRepository";
import { AgencyPricingPolicy } from "../../../Domain/Entities/Admin/AgencyPricingPolicy";
import { BasePricingPolicy } from "../../../Domain/Entities/Admin/BasePricingPolicy";
import { TravelerPricingPolicy } from "../../../Domain/Entities/Admin/TravelerPricingPolicy";
import { BasePricingPolicySchemaType, PricingPolicyModel } from "../../database/models/Admin/Pricing/BasePricingPolicySchema";
import { TravelerPricingPolicyModel, TravelerPricingPolicySchemaType } from "../../database/models/Admin/Pricing/TravelerPricingPolicySchema";
import { AgencyPricingPolicyModel, AgencyPricingPolicySchemaType } from "../../database/models/Admin/Pricing/AgencyPricingPolicySchema";
import { BaseRepository } from "../baseRepositories";
import { AppError } from "../../../Domain/utils/customError";
import { DeliveryPartner } from "../../../Domain/Enums/DeliveryPartnerType";

export class PricingPolicyRepository
    extends BaseRepository<BasePricingPolicySchemaType>
    implements IPricingPolicyRepository {

    constructor() {
        super(PricingPolicyModel);
    };

    async createPricingPolicy(
        policy: BasePricingPolicy
    ): Promise<BasePricingPolicy> {

        const persistenceObject = policy.toPersistence();

        let doc;

        if (policy.deliveryModel === DeliveryPartner.AGENCY) {
            doc = await AgencyPricingPolicyModel.create(persistenceObject);
        } else if (policy.deliveryModel === DeliveryPartner.TRAVELER) {
            doc = await TravelerPricingPolicyModel.create(persistenceObject);
        } else {
            throw new AppError("Unsupported delivery model");
        }

        return this.toDomain(doc.toObject());
    }


    async getActiveByDeliveryModel(model: "AGENCY" | "TRAVELER"): Promise<BasePricingPolicy | null> {

        const doc = await this.model
            .findOne({
                deliveryModel: model,
                isActive: true,
            })
            .lean<BasePricingPolicySchemaType>();


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
    private toDomain(doc: BasePricingPolicySchemaType): BasePricingPolicy {

        if (doc.deliveryModel === "AGENCY") {
            const agencyDoc = doc as AgencyPricingPolicySchemaType;
            const agencyPricing = new AgencyPricingPolicy(
                agencyDoc._id.toString(),
                agencyDoc.minBasePrice,
                agencyDoc.maxBasePrice,
                agencyDoc.minPricePerKm,
                agencyDoc.maxPricePerKm,
                agencyDoc.minPricePerKg,
                agencyDoc.maxPricePerKg,
                agencyDoc.platformFeePercent,
                agencyDoc.isActive,
                agencyDoc.policyVersion,
                agencyDoc.createdAt,
                agencyDoc.updatedAt
            );

            return agencyPricing
        }

        if (doc.deliveryModel === "TRAVELER") {
            const travelerDoc = doc as TravelerPricingPolicySchemaType;

            return new TravelerPricingPolicy(
                travelerDoc._id.toString(),

                travelerDoc.basePrice,
                travelerDoc.pricePerKm,

                travelerDoc.basePricePerKg,

                travelerDoc.transportMultipliers as Record<string, number>,

                travelerDoc.platformFeePercent,
                travelerDoc.isActive,
                travelerDoc.policyVersion,
                travelerDoc.createdAt,
                travelerDoc.updatedAt
            );
        }

        throw new Error("Unsupported delivery model");
    }

};
