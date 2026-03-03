import { inject, injectable } from "tsyringe";
import { IPincodeLookupService } from "../../../interfaces/services_Interfaces/pincodeLookupService.interface";
import { AppError } from "../../../../Domain/utils/customError";
import { BOOKING_MESSAGE } from "../../../../Infrastructure/constants/messages/bookingMessages";
import { GeoLocation, ICheckServiceablePartnersUsecase } from "../../../interfaces/useCase_Interfaces/user/Booking/ICheckServiceablePartnersUsecase";
import { IFindServicableAgencyUsecase } from "../../../interfaces/useCase_Interfaces/user/Booking/IFindServicableAgencyUsecase";
import { IFindServiceableTravelerUsecase } from "../../../interfaces/useCase_Interfaces/user/Booking/IFindServiceableTravelerUsecase";
import { ServiceableAgencyAndTravelerDTO } from "../../../Dto/User/Booking.dto";

@injectable()
export class CheckServiceablePartnersUsecase implements ICheckServiceablePartnersUsecase {
  constructor(
    @inject("IPincodeLookupService") private pincodeLookupService: IPincodeLookupService,
    @inject("IFindServicableAgencyUsecase") private _findServicableAgencyUsecase: IFindServicableAgencyUsecase,
    @inject("IFindServiceableTravelerUsecase") private _findServiceableTravelerUsecase: IFindServiceableTravelerUsecase,
  ) { }

  async execute(
    pickupLocation: GeoLocation,
    deliveryLocation: GeoLocation
  ): Promise<ServiceableAgencyAndTravelerDTO> {
    console.log("😂😂😂😂😂😂😂")

    if (
      pickupLocation.lat === deliveryLocation.lat &&
      pickupLocation.lng === deliveryLocation.lng
    ) {
      throw new AppError(BOOKING_MESSAGE.NOT_SERVICEABLE_SAME_LOCATION);
    }

    const agencies =
      await this._findServicableAgencyUsecase.execute(
        pickupLocation,
        deliveryLocation
      );

    const travelers =
      await this._findServiceableTravelerUsecase.execute(
        pickupLocation,
        deliveryLocation
      );

      console.log(agencies, travelers,":🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️")

    return { agencies, travelers }
  }
}
