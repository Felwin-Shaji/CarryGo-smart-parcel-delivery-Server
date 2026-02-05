import { inject, injectable } from "tsyringe";
import { IPincodeLookupService } from "../../../interfaces/services_Interfaces/pincodeLookupService.interface";
import { AppError } from "../../../../Domain/utils/customError";
import { BOOKING_MESSAGE } from "../../../../Infrastructure/constants/messages/bookingMessages";
import { IValidatePincodeUsecase } from "../../../interfaces/useCase_Interfaces/user/Booking/validatePincode.usecase";
import { IFindServicableAgencyUsecase } from "../../../interfaces/useCase_Interfaces/user/Booking/IFindServicableAgencyUsecase";

@injectable()
export class ValidatePincodeUsecase implements IValidatePincodeUsecase {
  constructor(
    @inject("IPincodeLookupService") private pincodeLookupService: IPincodeLookupService,
    @inject("IFindServicableAgencyUsecase") private _findServicableAgencyUsecase: IFindServicableAgencyUsecase,

  ) { }

  async execute(fromPincode: string, toPincode: string) {
    if (fromPincode === toPincode) {
      throw new AppError(BOOKING_MESSAGE.PINCODE_CANNOT_BE_SAME);
    }

    const from = await this.pincodeLookupService.getPincodeDetails(fromPincode);
    const to = await this.pincodeLookupService.getPincodeDetails(toPincode);

    if (!from || !to) throw new AppError(BOOKING_MESSAGE.NOT_SERVICEABLE_PINCODE);
    const agencies = await this._findServicableAgencyUsecase.execute(fromPincode, toPincode);


    return agencies
  }
}
