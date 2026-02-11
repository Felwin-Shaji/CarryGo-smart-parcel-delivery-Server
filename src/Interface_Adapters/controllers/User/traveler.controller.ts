import { Request, Response, NextFunction } from "express";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";
import { ITravelerController } from "../../Interface/Controllers_Interfaces/User_interfaces/ITravelerController";
import { WorkerKYCFileFields } from "../../../Infrastructure/services/storage/multer";
import { inject, injectable } from "tsyringe";
import { ISubmitTravelerKycUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/Traveler/ISubmitTravelerKycUseCase";
import { SubmitTravelerKycRequestDTO } from "../../../Application/Dto/User/traveler.dto";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";
import { AppError } from "../../../Domain/utils/customError";
import { IGetTravelerKycUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/Traveler/IGetTravelerKycUseCase";
import { IReSubmitTravelerKycUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/Traveler/IReSubmitTravelerKycUseCase";


@injectable()
export class TravelerController implements ITravelerController {
    constructor(
        @inject("ISubmitTravelerKycUseCase") private readonly _submitTravelerKycUseCase: ISubmitTravelerKycUseCase,
        @inject("IGetTravelerKycUseCase") private readonly _getTravelerKycUseCase: IGetTravelerKycUseCase,
        @inject("IReSubmitTravelerKycUseCase") private readonly _reSubmitTravelerKycUseCase: IReSubmitTravelerKycUseCase,
    ) { };

    submitKYC = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

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
        } catch (error) {
            next(error);
        }
    }

    getKyc = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id;
            if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

            const kycData = await this._getTravelerKycUseCase.execute(userId);


            res.status(STATUS.OK).json(
                ApiResponse.success(
                    USER_MESSAGES.KYC_FETCH_SUCCESS,
                    kycData
                )
            );
        }
        catch (error) {
            next(error);
        }
    };


    reSubmitKYC = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
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

        } catch (error) {
            next(error);
        }
    }
}