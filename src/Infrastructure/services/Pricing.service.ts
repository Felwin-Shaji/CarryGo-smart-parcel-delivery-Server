import { inject, injectable } from "tsyringe";
import { IPricingService } from "../../Application/interfaces/services_Interfaces/IPricingService";
import { IDistanceService } from "../../Application/interfaces/services_Interfaces/IDistanceService";
import { IPricingPolicyRepository } from "../../Application/interfaces/repositories_interfaces/adminRepositories_Interfaces/pricingPolicy.repository";
import { IAgencyPricingRepository } from "../../Application/interfaces/repositories_interfaces/agencyRepositories_Interfaces/agencyPricing.repository";
import { IUserRepository } from "../../Application/interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { CalculatePriceRequestDTO, CalculatePriceResponseDTO } from "../../Application/Dto/User/Booking.dto";
import { AppError } from "../../Domain/utils/customError";
import { USER_MESSAGES } from "../constants/messages/userMessage";
import { STATUS } from "../constants/statusCodes";
import { PRICING_POLICY_MESSAGE } from "../constants/messages/pricingPolicyMessage";
import { AGENCY_MESSAGES } from "../constants/messages/agencyMessages";
import { DeliveryPartner } from "../../Domain/Enums/DeliveryPartnerType";


@injectable()
export class PricingService implements IPricingService {
    constructor(
        @inject("IDistanceService") private _distanceService: IDistanceService,
        @inject("IPricingPolicyRepository") private _pricingPolicyRepository: IPricingPolicyRepository,
        @inject("IAgencyPricingRepository") private _agencyPricingRepository: IAgencyPricingRepository,
        @inject("IUserRepository") private _userRepo: IUserRepository
    ) { }

    async calculate(
        userId: string,
        dto: CalculatePriceRequestDTO
    ): Promise<CalculatePriceResponseDTO> {

        const { deliveryType, partnerId, packageDetails, pickupAddressId, deliveryAddressId } = dto;

        const pickup = await this._userRepo.getAddressById(userId, pickupAddressId);
        const delivery = await this._userRepo.getAddressById(userId, deliveryAddressId);

        if (!pickup || !delivery) {
            throw new AppError(USER_MESSAGES.INVALID_ADDRESS, STATUS.BAD_REQUEST);
        }

        const distanceKm = this._distanceService.calculateDistanceInKilometers(pickup.location, delivery.location);

        const pricingPolicy = await this._pricingPolicyRepository.getActiveByDeliveryModel(deliveryType);

        if (!pricingPolicy) {
            throw new AppError(
                PRICING_POLICY_MESSAGE.ADMIN_PRICING_POLICY_NOT_FOUND,
                STATUS.NOT_FOUND
            );
        }

        const basePrice = pricingPolicy.minBasePrice;
        const distanceCharge = distanceKm * pricingPolicy.minPricePerKm;
        let sizeCharge = pricingPolicy.minSizePrice;

        if (deliveryType === DeliveryPartner.AGENCY) {
            if (!partnerId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

            const agencyPricing = await this._agencyPricingRepository.getPricingByAgency(partnerId, "STANDARD");
            if (!agencyPricing) throw new AppError(AGENCY_MESSAGES.PRICING_NOT_FOUND, STATUS.NOT_FOUND);

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
            currency: "INR",
        };
    }

    private round(n: number) {
        return Math.round(n * 100) / 100;
    }
}
