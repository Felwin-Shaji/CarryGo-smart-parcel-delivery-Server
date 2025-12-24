import { Request, Response, NextFunction } from "express";
import { IHubWorkerController } from "../../Interface/Controllers_Interfaces/Hub_interface/HubWorkerController";
import { inject, injectable } from "tsyringe";
import { IAddWorkerTempUseCase } from "../../../Application/interfaces/useCase_Interfaces/Worker/addWorkerTempUseCase.interface";
import { IWorkerVerifyOtpUseCase } from "../../../Application/interfaces/useCase_Interfaces/Worker/addWorkerVerifyOtpUseCase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { WorkerKYCFileFields } from "../../../Infrastructure/services/storage/multer";
import { IUploadWorkerKycFilesUsecase } from "../../../Application/interfaces/useCase_Interfaces/Worker/uploadWorkerKycFilesUsecase";
import { IAddWorkerUsecase } from "../../../Application/interfaces/useCase_Interfaces/Worker/AddWorkerUsecase";
import { ApiResponse } from "../../presenters/ApiResponse";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";
import { AddWorkerTempRequestDTO } from "../../../Application/Dto/Hub/hub.dto";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";
import { AppError } from "../../../Domain/utils/customError";

@injectable()
export class HubWorkerController implements IHubWorkerController {

    constructor(
        @inject("IAddWorkerTempUseCase") private _addWorkerTempUseCase: IAddWorkerTempUseCase,
        @inject("IWorkerVerifyOtpUseCase") private _workerVerifyOtpUseCase: IWorkerVerifyOtpUseCase,

        @inject("IUploadWorkerKycFilesUsecase") private _uploadWorkerKycFilesUsecase: IUploadWorkerKycFilesUsecase,

        @inject("IAddWorkerUsecase") private _addWorkerUsecase: IAddWorkerUsecase,
    ) { }

    addNewWorker = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            const dto = req.body as AddWorkerTempRequestDTO
            const hubId = req.user?.id;
            if (!hubId) throw new AppError(HUB_MESSAGES.HUBID_MISSING, STATUS.BAD_REQUEST)


            const savedTempWorker = await this._addWorkerTempUseCase.execute(hubId, dto);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    HUB_MESSAGES.OTP_SEND_SICCESS,
                    savedTempWorker
                )
            )

        } catch (error) {
            next(error);
        }
    };


    verifyWorkerOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { email, otp } = req.body;

            await this._workerVerifyOtpUseCase.verify(email, otp);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    HUB_MESSAGES.OTP_VERIFIED
                )
            )

        } catch (error) {
            next(error);
        }
    };


    uploadWorkerKYC = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            const { email, idType, idNumber } = req.body;
            const hubId = req.user?.id;
            if (!hubId) throw new AppError(HUB_MESSAGES.HUBID_MISSING, STATUS.BAD_REQUEST)



            const files = req.files as WorkerKYCFileFields;
            const uploaded = await this._uploadWorkerKycFilesUsecase.execute(files);

            const workers = await this._addWorkerUsecase.execute(email, idType, idNumber, hubId, uploaded);

            console.log(workers);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    WORKER_MESSAGES.WORKER_ADDED_SUCCESSFULLY,
                    workers
                )
            );

        } catch (error) {
            next(error);
        }
    };

}
