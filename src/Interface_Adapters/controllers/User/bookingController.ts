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
import { ICalculateBookingPriceUsecase } from "../../../Application/interfaces/useCase_Interfaces/user/Booking/ICalculateBookingPriceUsecase";
import { CalculatePriceRequestDTO, CreateBookingRequestDTO } from "../../../Application/Dto/User/Booking.dto";
import { ICreateBookingUsecase } from "../../../Application/interfaces/useCase_Interfaces/user/Booking/ICreateBookingUsecase";
import { ICreatePaymentOrderUsecase } from "../../../Application/interfaces/useCase_Interfaces/Payment/ICreatePaymentOrderUsecase";

@injectable()
export class UserBookingController implements IUserBookingController {
    constructor(
        @inject("IValidatePincodeUsecase") private _validatePincodeUsecase: IValidatePincodeUsecase,
        @inject("IFindServicableAgencyUsecase") private _findServicableAgencyUsecase: IFindServicableAgencyUsecase,
        @inject("IGetAddressesByPincodeUsecase") private _getAddressesByPincodeUsecase: IGetAddressesByPincodeUsecase,
        @inject("ICalculateBookingPriceUsecase") private _calculateBookingPriceUsecase: ICalculateBookingPriceUsecase,
        @inject("ICreateBookingUsecase") private _createBookingUsecase: ICreateBookingUsecase,
        @inject("ICreatePaymentOrderUsecase") private _createPaymentOrderUsecase: ICreatePaymentOrderUsecase,
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

    calculatePrice = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            const userId = req.user?.id
            const dto = req.body as CalculatePriceRequestDTO

            if (!userId) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

            const pricing = await this._calculateBookingPriceUsecase.execute(userId, dto)

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    BOOKING_MESSAGE.PRICE_CALCULATED,
                    pricing
                )
            );

        } catch (error) {
            next(error)
        }
    }


    createBooking = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            console.log(req.body);

            const userId = req.user?.id;
            const dto = req.body as CreateBookingRequestDTO;

            if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_GATEWAY)

            const bookingId = await this._createBookingUsecase.execute(userId, dto)

            return res.status(200).json(
                ApiResponse.success(
                    BOOKING_MESSAGE.SUCCESS,
                    bookingId
                )
            )
        } catch (error) {
            next(error)
        }
    }

    createPaymentOrder = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            console.log("............................................................................... /n ...........................................................................")
            const key = process.env.RAZORPAY_KEY_ID
            console.log(key)

            const order = await this._createPaymentOrderUsecase.execute({ bookingId: "697773a1f6b2df0741b4e781", amount: 13801 })

            const respomse = {
                "orderId":order.orderId ,
                "amount": order.amount,
                "currency": order.currency,
                "key": "" + key
            }
            return res.status(STATUS.ACCEPTED).json(
                ApiResponse.success(BOOKING_MESSAGE.INVALID_AMOUNT, respomse)
            )
        } catch (error) {
            next(error)
        }
    };


    verifyPayment = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            return res.status(STATUS.ACCEPTED).json(
                ApiResponse.success(BOOKING_MESSAGE.INVALID_AMOUNT,)
            )

        } catch (error) {
            next(error)
        }
    }
};