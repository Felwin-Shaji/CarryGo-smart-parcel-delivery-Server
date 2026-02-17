import { DeliveryPartner } from "../../Enums/DeliveryPartnerType";
import { AppError } from "../../utils/customError";
import { TransportMode } from "../User/TravelRequest";
import { BasePricingPolicy } from "./BasePricingPolicy";

export class TravelerPricingPolicy extends BasePricingPolicy {
    constructor(
        id: string | null,

        public basePricePerKg: number,

        public flightMultiplier: number,
        public trainMultiplier: number,
        public carMultiplier: number,
        public busMultiplier: number,
        public bikeMultiplier: number,

        platformFeePercent: number,
        isActive: boolean,
        policyVersion: number,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        super(id, DeliveryPartner.TRAVELER, platformFeePercent, isActive, policyVersion, createdAt, updatedAt);
        this.validate();
    }

    validate(): void {
        if (this.basePricePerKg <= 0) {
            throw new AppError("Base price per kg must be positive");
        }
    };

    toPersistence() {
        return {
            deliveryModel: this.deliveryModel,
            basePricePerKg: this.basePricePerKg,
            flightMultiplier: this.flightMultiplier,
            trainMultiplier: this.trainMultiplier,
            carMultiplier: this.carMultiplier,
            busMultiplier: this.busMultiplier,
            bikeMultiplier: this.bikeMultiplier,
            platformFeePercent: this.platformFeePercent,
            isActive: this.isActive,
            policyVersion: this.policyVersion,
        };
    }

    public getMultiplier(mode: TransportMode): number {
        switch (mode) {
            case "FLIGHT": return this.flightMultiplier;
            case "TRAIN": return this.trainMultiplier;
            case "CAR": return this.carMultiplier;
            case "BUS": return this.busMultiplier;
            case "BIKE": return this.bikeMultiplier;
            default:
                throw new AppError("Invalid transport mode");
        }
    }


}
