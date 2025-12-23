import { inject, injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { IValidatePincodeUsecase } from "../../../Application/interfaces/useCase_Interfaces/user/Booking/validatePincode.usecase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";
import { BOOKING_MESSAGE } from "../../../Infrastructure/constants/messages/userMessage";
import { IUserBookingController } from "../../../Application/interfaces/Controllers_Interfaces/User_interfaces/Booking/IUserBookingController";

@injectable()
export class UserBookingController implements IUserBookingController {
    constructor(
        @inject("IValidatePincodeUsecase") private _validatePincodeUsecase: IValidatePincodeUsecase
    ) { };

    validatePincode = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { fromPincode, toPincode } = req.body;

            const isValidate = await this._validatePincodeUsecase.execute(fromPincode, toPincode);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    BOOKING_MESSAGE.PINCODE_VALIED,
                    isValidate
                )
            )

        } catch (error) {
            next(error);
        };
    };
};