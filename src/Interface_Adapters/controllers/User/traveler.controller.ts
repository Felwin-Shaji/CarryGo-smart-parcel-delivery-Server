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


@injectable()
export class TravelerController implements ITravelerController {
    constructor(
        @inject("ISubmitTravelerKycUseCase") private readonly _submitTravelerKycUseCase: ISubmitTravelerKycUseCase
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
}