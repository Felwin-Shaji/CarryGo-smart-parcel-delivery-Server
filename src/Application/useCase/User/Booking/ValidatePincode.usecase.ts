import { inject, injectable } from "tsyringe";
import { IPincodeLookupService } from "../../../interfaces/services_Interfaces/pincodeLookupService.interface";
import { IValidatePincodeUsecase } from "../../../interfaces/useCase_Interfaces/user/Booking/validatePincode.usecase";

@injectable()
export class ValidatePincodeUsecase implements IValidatePincodeUsecase  {
  constructor(
    @inject("IPincodeLookupService") private pincodeLookupService: IPincodeLookupService
  ) {}

  async execute(fromPincode: string, toPincode: string) {
    if (fromPincode === toPincode) {
      throw new Error("From and To pincodes cannot be same");
    }

    const from = await this.pincodeLookupService.getPincodeDetails(fromPincode);
    const to = await this.pincodeLookupService.getPincodeDetails(toPincode);

    return {
      serviceable: true,
      from,
      to,
    };
  }
}
