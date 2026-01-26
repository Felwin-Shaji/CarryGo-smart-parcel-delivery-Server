import { inject, injectable } from "tsyringe";
import { ICalculateBookingPriceUsecase } from "../../../interfaces/useCase_Interfaces/user/Booking/ICalculateBookingPriceUsecase";
import { IDistanceService } from "../../../interfaces/services_Interfaces/IDistanceService";
import { CalculatePriceRequestDTO, CalculatePriceResponseDTO } from "../../../Dto/User/Booking.dto";
import { IPricingPolicyRepository } from "../../../interfaces/repositories_interfaces/adminRepositories_Interfaces/pricingPolicy.repository";
import { IAgencyPricingRepository } from "../../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agencyPricing.repository";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { AppError } from "../../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { PRICING_POLICY_MESSAGE } from "../../../../Infrastructure/constants/messages/pricingPolicyMessage";
import { AGENCY_MESSAGES } from "../../../../Infrastructure/constants/messages/agencyMessages";

@injectable()
export class CalculateBookingPriceUsecase implements ICalculateBookingPriceUsecase {
    constructor(
        @inject("IDistanceService") private _distanceService: IDistanceService,
        @inject("IPricingPolicyRepository") private _pricingPolicyRepository: IPricingPolicyRepository,
        @inject("IAgencyPricingRepository") private _agencyPricingRepository: IAgencyPricingRepository,
        @inject("IUserRepository") private _userRepo: IUserRepository
    ) { }

    async execute(userId: string, dto: CalculatePriceRequestDTO): Promise<CalculatePriceResponseDTO> {

        const { deliveryType, partnerId, packageDetails, pickupAddressId, deliveryAddressId } = dto;

        const pickupAddress = await this._userRepo.getAddressById(userId, pickupAddressId);
        const deliveryAddress = await this._userRepo.getAddressById(userId, deliveryAddressId);

        if (!pickupAddress || !deliveryAddress) {
            throw new AppError(USER_MESSAGES.INVALID_ADDRESS, STATUS.BAD_REQUEST);
        }

        const distanceKm = this._distanceService.calculateDistanceInKilometers(pickupAddress.location, deliveryAddress.location);

        const pricingPolicy = await this._pricingPolicyRepository.getActiveByDeliveryModel(deliveryType);
        if (!pricingPolicy) throw new AppError(PRICING_POLICY_MESSAGE.ADMIN_PRICING_POLICY_NOT_FOUND, STATUS.NOT_FOUND);

        const basePrice = this.clamp(
            pricingPolicy.minBasePrice,
            pricingPolicy.maxBasePrice,
            pricingPolicy.minBasePrice
        );

        const pricePerKm = this.clamp(
            pricingPolicy.minPricePerKm,
            pricingPolicy.maxPricePerKm,
            pricingPolicy.minPricePerKm
        );

        const distanceCharge = distanceKm * pricePerKm;

        let sizeCharge = pricingPolicy.minSizePrice;

        if (deliveryType === "AGENCY") {

            if (!partnerId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

            const agencyPricing = await this._agencyPricingRepository.getPricingByAgency(partnerId, "STANDARD");

            console.log(agencyPricing, "llllllllllllllllllllllllssssssssssssssssssssssssssssssssssssss..............................");

            if (!agencyPricing) throw new AppError(AGENCY_MESSAGES.PRICING_NOT_FOUND, STATUS.NOT_FOUND)

            sizeCharge = agencyPricing.sizePricing[packageDetails.size].price;
        }

        const subTotal = basePrice + distanceCharge + sizeCharge;
        const platformFee = (subTotal * pricingPolicy.platformFeePercent) / 100;

        const totalPrice = Math.round(subTotal + platformFee);

        return {
            distanceKm: this.round(distanceKm),
            basePrice: this.round(basePrice),
            distanceCharge: this.round(distanceCharge),
            sizeCharge: this.round(sizeCharge),
            platformFee: this.round(platformFee),
            totalPrice,
            currency: "INR" as const,
        };

    }

    private clamp(min: number, max: number, value: number) {
        return Math.min(Math.max(value, min), max);
    };

    private round(n: number) {
        return Math.round(n * 100) / 100;
    }
}