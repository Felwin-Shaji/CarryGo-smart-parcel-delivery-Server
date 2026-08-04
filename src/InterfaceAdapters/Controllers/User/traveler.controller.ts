import { Request, Response } from "express";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { ApiResponse } from "../../Presenters/ApiResponse";
import { ITravelerController } from "../../Interfaces/Controllers/User/ITravelerController";
import { WorkerKYCFileFields } from "../../../Infrastructure/Services/Storage/multer";
import { inject, injectable } from "tsyringe";
import { ISubmitTravelerKycUseCase } from "../../../Application/Interfaces/UseCases/User/Traveler/ISubmitTravelerKycUseCase";
import { CreateTravelRequestDTO, SubmitTravelerKycRequestDTO, TravelerRequestFilterDTO } from "../../../Application/DTOs/User/TravelerDTO";
import { USER_MESSAGES } from "../../../Infrastructure/Constants/Messages/userMessage";
import { AppError } from "../../../Domain/Utils/customError";
import { IGetTravelerKycUseCase } from "../../../Application/Interfaces/UseCases/User/Traveler/IGetTravelerKycUseCase";
import { IReSubmitTravelerKycUseCase } from "../../../Application/Interfaces/UseCases/User/Traveler/IReSubmitTravelerKycUseCase";
import { ICreateTravelRequestUseCase } from "../../../Application/Interfaces/UseCases/User/Traveler/ICreateTravelRequestUseCase";
import { IGetTravelRequestsUseCase } from "../../../Application/Interfaces/UseCases/User/Traveler/IGetTravelRequestsUseCase";
import { IGetTravelerTripOverviewUseCase } from "../../../Application/Interfaces/UseCases/User/Traveler/IGetTravelerTripOverviewUseCase";
import { IGetBookingUsecase } from "../../../Application/Interfaces/UseCases/User/Booking/IGetBookingUseCase";
import { IUpdateBookingStatusUsecase } from "../../../Application/Interfaces/UseCases/User/Booking/IUpdateBookingStatusUseCase";
import { TravelerActionStatus } from "../../../Infrastructure/Types/types";
import { BOOKING_MESSAGE } from "../../../Infrastructure/Constants/Messages/bookingMessages";


@injectable()
export class TravelerController implements ITravelerController {
    constructor(
        @inject("ISubmitTravelerKycUseCase") private readonly _submitTravelerKycUseCase: ISubmitTravelerKycUseCase,
        @inject("IGetTravelerKycUseCase") private readonly _getTravelerKycUseCase: IGetTravelerKycUseCase,
        @inject("IReSubmitTravelerKycUseCase") private readonly _reSubmitTravelerKycUseCase: IReSubmitTravelerKycUseCase,
        @inject("ICreateTravelRequestUseCase") private readonly _createTravelRequestUseCase: ICreateTravelRequestUseCase,
        @inject("IGetTravelRequestsUseCase") private readonly _getTravelRequestsUseCase: IGetTravelRequestsUseCase,
        @inject("IGetTravelerTripOverviewUseCase") private readonly _getTravelerTripOverviewUseCase: IGetTravelerTripOverviewUseCase,
        @inject("IGetBookingUsecase") private readonly _getBookingUsecase: IGetBookingUsecase,
        @inject("IUpdateBookingStatusUsecase") private readonly _updateBookingStatusUsecase: IUpdateBookingStatusUsecase
    ) { };

    submitKYC = async (req: Request, res: Response): Promise<void> => {

        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST)
        const files = req.files as WorkerKYCFileFields;
        const dto = req.body as SubmitTravelerKycRequestDTO;

        const ress = await this._submitTravelerKycUseCase.execute(userId, dto, files);
        console.log("KYC submission result:", ress);

        res.status(STATUS.OK).json(
            ApiResponse.success(
                USER_MESSAGES.KYC_SUBMITTED_SUCCESS,
            )
        );
    }

    getKyc = async (req: Request, res: Response): Promise<void> => {

        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

        const kycData = await this._getTravelerKycUseCase.execute(userId);


        res.status(STATUS.OK).json(
            ApiResponse.success(
                USER_MESSAGES.KYC_FETCH_SUCCESS,
                kycData
            )
        );
    };

    reSubmitKYC = async (req: Request, res: Response): Promise<void> => {
        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

        const files = req.files as WorkerKYCFileFields;
        const dto = req.body as SubmitTravelerKycRequestDTO;

        await this._reSubmitTravelerKycUseCase.execute(userId, dto, files);

        res.status(STATUS.OK).json(
            ApiResponse.success(
                USER_MESSAGES.KYC_RESUBMITTED_SUCCESS
            )
        );
    }

    createTravelRequest = async (req: Request, res: Response): Promise<void> => {

        console.log("Received request to create travel request with body:", req.body);
        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

        const dto = req.body as CreateTravelRequestDTO;

        await this._createTravelRequestUseCase.execute(userId, dto);

        res.status(STATUS.OK).json(
            ApiResponse.success(
                USER_MESSAGES.TRAVEL_REQUEST_CREATED_SUCCESS
            )
        );
    }

    getTravelRequests = async (req: Request, res: Response): Promise<void> => {
        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

        const dto: TravelerRequestFilterDTO = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 5,
            status: req.query.status as string | "",
        }

        const travelRequests = await this._getTravelRequestsUseCase.execute(userId, dto);

        res.status(STATUS.OK).json(
            ApiResponse.success(
                USER_MESSAGES.TRAVEL_REQUESTS_FETCHED_SUCCESS,
                travelRequests
            )
        );
    };


    getTravelRequestById = async (req: Request, res: Response): Promise<void> => {
        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

        const travelRequestId = req.params.id;
        if (!travelRequestId) throw new AppError(USER_MESSAGES.TRAVEL_REQUEST_ID_MISSING, STATUS.BAD_REQUEST);

        const travelRequest = await this._getTravelerTripOverviewUseCase.execute(userId, travelRequestId);


        res.status(STATUS.OK).json(
            ApiResponse.success(
                USER_MESSAGES.TRAVEL_REQUESTS_FETCHED_SUCCESS,
                travelRequest
            )
        );
    }


    getTravelerBookingDetails = async (req: Request, res: Response): Promise<void> => {

        const bookingId = req.params.bookingId;
        if (!bookingId) throw new AppError(BOOKING_MESSAGE.NOT_FOUND, STATUS.BAD_REQUEST)

        const booking = await this._getBookingUsecase.execute(bookingId);

        res.status(STATUS.OK).json(
            ApiResponse.success(
                USER_MESSAGES.TRAVEL_REQUESTS_FETCHED_SUCCESS,
                booking
            )
        );
    }

    updateBookingStatus = async (req: Request, res: Response): Promise<void> => {

        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

        const bookingId = req.params.bookingId;
        if (!bookingId) throw new AppError(BOOKING_MESSAGE.NOT_FOUND, STATUS.BAD_REQUEST)

        const status = req.body.status as TravelerActionStatus

        await this._updateBookingStatusUsecase.execute(userId, bookingId, status)

        res.status(STATUS.OK).json(
            ApiResponse.success(
                BOOKING_MESSAGE.STATUS_UPDATED,
            )
        );
    };
}