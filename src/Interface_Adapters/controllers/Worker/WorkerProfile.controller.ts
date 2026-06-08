import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { EditWorkerProfileRequestDto, WorkerResetPasswordRequestDTO } from "../../../Application/Dto/Workers/workerProfile.dto";
import { AppError } from "../../../Domain/utils/customError";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";
import { IGetWorkerProfileUseCase } from "../../../Application/interfaces/useCase_Interfaces/Worker/IGetWorkerProfileUseCase";
import { IEditWorkerProfileUseCase } from "../../../Application/interfaces/useCase_Interfaces/Worker/IEditWorkerProfileUseCase";
import { IResetWorkerPasswordUseCase } from "../../../Application/interfaces/useCase_Interfaces/Worker/IResetWorkerPasswordUseCase";


@injectable()
export class WorkerProfileController {
    constructor(
        @inject("IGetWorkerProfileUseCase") private _getWorkerProfileUseCase: IGetWorkerProfileUseCase,
        @inject("IEditWorkerProfileUseCase") private _editWorkerProfileUseCase: IEditWorkerProfileUseCase,
        @inject("IResetWorkerPasswordUseCase") private _workerResetWorkerPassword: IResetWorkerPasswordUseCase,
    ) { }

    getWorkerProfile = async (req: Request, res: Response): Promise<Response | void> => {
        const workerId = req.user?.id;
        if (!workerId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST)

        const workerProfileData = await this._getWorkerProfileUseCase.execute(workerId);

        return res.status(200).json(
            ApiResponse.success(
                WORKER_MESSAGES.PROFILE_FETCHED,
                workerProfileData
            )
        );
    }

    editWorkerProfile = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.body as EditWorkerProfileRequestDto;

        const workerId = req.user?.id;
        if (!workerId) throw new AppError(WORKER_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST)

        const updatedWorkerProfile = await this._editWorkerProfileUseCase.execute(workerId, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                WORKER_MESSAGES.PROFILE_UPDATED,
                updatedWorkerProfile
            )
        )
    };

    resetWorkerPassword = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.body as WorkerResetPasswordRequestDTO;

        const workerId = req.user?.id;
        if (!workerId) throw new AppError(WORKER_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

        await this._workerResetWorkerPassword.execute(workerId, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                WORKER_MESSAGES.PASSWORD_RESET
            )
        )
    }
}
