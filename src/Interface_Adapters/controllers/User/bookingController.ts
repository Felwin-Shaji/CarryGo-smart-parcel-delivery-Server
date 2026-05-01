import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";
import { IUserBookingController } from "../../Interface/Controllers_Interfaces/User_interfaces/Booking/IUserBookingController";
import { BOOKING_MESSAGE } from "../../../Infrastructure/constants/messages/bookingMessages";
import { AppError } from "../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";
import { ICalculateBookingPriceUsecase } from "../../../Application/interfaces/useCase_Interfaces/user/Booking/ICalculateBookingPriceUsecase";
import { BookingFilterDTO, CalculatePriceRequestDTO, CheckServiceableAgencyDTO, CheckServiceableTravelerDTO, CreateBookingRequestDTO } from "../../../Application/Dto/User/Booking.dto";
import { ICreateBookingUsecase } from "../../../Application/interfaces/useCase_Interfaces/user/Booking/ICreateBookingUsecase";
import { ICreatePaymentOrderUsecase } from "../../../Application/interfaces/useCase_Interfaces/Payment/ICreatePaymentOrderUsecase";
import { IUserBookingsUsecase } from "../../../Application/interfaces/useCase_Interfaces/user/Booking/IUserBookingsUsecase";
import { IGetBookingUsecase } from "../../../Application/interfaces/useCase_Interfaces/user/Booking/IGetBookingUsecase";
import { IFindServicableAgencyUsecase } from "../../../Application/interfaces/useCase_Interfaces/user/Booking/IFindServicableAgencyUsecase";
import { IFindServiceableTravelerUsecase } from "../../../Application/interfaces/useCase_Interfaces/user/Booking/IFindServiceableTravelerUsecase";
import { IBookingPaymentFailedUseCase } from "../../../Application/interfaces/useCase_Interfaces/Payment/IBookingPaymentFailedUseCase";


@injectable()
export class UserBookingController implements IUserBookingController {
    constructor(
        @inject("ICalculateBookingPriceUsecase") private _calculateBookingPriceUsecase: ICalculateBookingPriceUsecase,
        @inject("ICreateBookingUsecase") private _createBookingUsecase: ICreateBookingUsecase,
        @inject("ICreatePaymentOrderUsecase") private _createPaymentOrderUsecase: ICreatePaymentOrderUsecase,
        @inject("IUserBookingsUsecase") private _userBookingsUsecase: IUserBookingsUsecase,
        @inject("IGetBookingUsecase") private _getBookingUsecase: IGetBookingUsecase,
        @inject("IFindServicableAgencyUsecase") private _findServicableAgencyUsecase: IFindServicableAgencyUsecase,
        @inject("IFindServiceableTravelerUsecase") private _findServiceableTravelerUsecase: IFindServiceableTravelerUsecase,
        @inject("IBookingPaymentFailedUseCase") private _bookingPaymentFailedUseCase: IBookingPaymentFailedUseCase,


    ) { };

    checkServiceableAgency = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.body as CheckServiceableAgencyDTO;

        const servicableAgency = await this._findServicableAgencyUsecase.execute(dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                BOOKING_MESSAGE.PINCODE_VALIED,
                servicableAgency
            )
        )

    };

    checkServiceableTravelers = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.body as CheckServiceableTravelerDTO;
        const userId = req.user?.id
        if (!userId) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);


        const servicableTravelers = await this._findServiceableTravelerUsecase.execute(userId, dto)

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                BOOKING_MESSAGE.PINCODE_VALIED,
                servicableTravelers
            )
        )
    }


    calculatePrice = async (req: Request, res: Response): Promise<Response | void> => {

        const userId = req.user?.id
        const dto = req.body as CalculatePriceRequestDTO

        console.log("API HIT:", Date.now());
        if (!userId) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        const pricing = await this._calculateBookingPriceUsecase.execute(userId, dto)

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                BOOKING_MESSAGE.PRICE_CALCULATED,
                pricing
            )
        );
    }


    createBooking = async (req: Request, res: Response): Promise<Response | void> => {

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
    }

    createPaymentOrder = async (req: Request, res: Response): Promise<Response | void> => {

        const { bookingId } = req.params
        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_GATEWAY)

        if (!bookingId) throw new AppError(BOOKING_MESSAGE.NOT_FOUND, STATUS.NOT_FOUND);

        const order = await this._createPaymentOrderUsecase.execute(userId, bookingId)

        return res.status(STATUS.ACCEPTED).json(
            ApiResponse.success(BOOKING_MESSAGE.INVALID_AMOUNT, order)
        )
    };


    verifyPayment = async (req: Request, res: Response): Promise<Response | void> => {

        return res.status(STATUS.ACCEPTED).json(
            ApiResponse.success(BOOKING_MESSAGE.INVALID_AMOUNT, STATUS.OK)
        )

    }

    paymentfailure = async (req: Request, res: Response): Promise<Response | void> => {

        const { bookingId } = req.body;
        if (!bookingId) throw new AppError(BOOKING_MESSAGE.NOT_FOUND, STATUS.NOT_FOUND);

        await this._bookingPaymentFailedUseCase.execute(bookingId)
        return res.status(STATUS.ACCEPTED).json(
            ApiResponse.success(BOOKING_MESSAGE.INVALID_AMOUNT, STATUS.OK)
        )
    };

    userBookings = async (req: Request, res: Response): Promise<Response | void> => {

        const userId = req.user?.id
        const dto: BookingFilterDTO = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            deliveryType: req.query.deliveryType?.toString() || '',
            status: req.query.status?.toString() || "",
            paymentStatus: req.query.paymentStatus?.toString() || "",
        }
        if (!userId) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        const respose = await this._userBookingsUsecase.execute(userId, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                BOOKING_MESSAGE.FOUND,
                respose
            )
        )
    }

    getBookingById = async (req: Request, res: Response): Promise<Response | void> => {
        const { bookingId } = req.params
        if (!bookingId) throw new AppError(BOOKING_MESSAGE.NOT_FOUND, STATUS.NOT_FOUND);

        const bookingResponse = await this._getBookingUsecase.execute(bookingId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                BOOKING_MESSAGE.FOUND,
                bookingResponse
            )
        )
    }
}; 