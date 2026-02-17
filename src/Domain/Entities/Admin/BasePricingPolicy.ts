import { DeliveryModel } from "./AgencyPricingPolicy";

export abstract class BasePricingPolicy {
    constructor(
        public readonly id: string | null,
        public deliveryModel: DeliveryModel,
        public platformFeePercent: number,
        public isActive: boolean,
        public policyVersion: number,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) { }
    abstract validate(): void;
    abstract toPersistence():object;
}
