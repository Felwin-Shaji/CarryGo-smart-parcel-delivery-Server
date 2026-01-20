import { inject, injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { IValidatePincodeUsecase } from "../../../Application/interfaces/useCase_Interfaces/user/Booking/validatePincode.usecase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";
import { IUserBookingController } from "../../Interface/Controllers_Interfaces/User_interfaces/Booking/IUserBookingController";
import { IFindServicableAgencyUsecase } from "../../../Application/interfaces/useCase_Interfaces/user/Booking/IFindServicableAgencyUsecase";
import { BOOKING_MESSAGE } from "../../../Infrastructure/constants/messages/bookingMessages";
import { AppError } from "../../../Domain/utils/customError";
import { IGetAddressesByPincodeUsecase } from "../../../Application/interfaces/useCase_Interfaces/user/Booking/IGetAddressesByPincodeUsecase";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";
import { ADDRESS_MESSAGES } from "../../../Infrastructure/constants/messages/addressMessages";

@injectable()
export class UserBookingController implements IUserBookingController {
    constructor(
        @inject("IValidatePincodeUsecase") private _validatePincodeUsecase: IValidatePincodeUsecase,
        @inject("IFindServicableAgencyUsecase") private _findServicableAgencyUsecase: IFindServicableAgencyUsecase,
        @inject("IGetAddressesByPincodeUsecase") private _getAddressesByPincodeUsecase: IGetAddressesByPincodeUsecase,
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

    getServiceableHubsWithAgency = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { fromPincode, toPincode } = req.query as {
                fromPincode?: string;
                toPincode?: string;
            };

            console.log(fromPincode, toPincode)


            if (!fromPincode || !toPincode) {
                throw new AppError(BOOKING_MESSAGE.INVALID_REQUEST_PARAMETERS, STATUS.BAD_REQUEST);
            }

            const agencies = await this._findServicableAgencyUsecase.execute(fromPincode, toPincode);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    BOOKING_MESSAGE.SERVICEABLE_AGENCY_FOUND,
                    agencies
                )
            )

        } catch (error) {
            next(error);
        }
    };

    getAddressByPincode = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const userId = req.user?.id;
            const pincode = req.query.pincode as string;

            if (!userId) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

            console.log(pincode);

            const response = await this._getAddressesByPincodeUsecase.execute(userId, pincode);

            console.log(response)

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    ADDRESS_MESSAGES.ADDRESS_FETCHED,
                    response
                )
            )


        } catch (error) {
            next(error)
        }
    }
};