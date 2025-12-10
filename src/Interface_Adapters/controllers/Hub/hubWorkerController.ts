import { Request, Response, NextFunction } from "express";
import { IHubWorkerController } from "../../../Application/interfaces/Controllers_Interfaces/Hub_interface/HubWorkerController";
import { inject, injectable } from "tsyringe";
import { IAddWorkerTempUseCase } from "../../../Application/interfaces/useCase_Interfaces/Worker/addWorkerTempUseCase.interface";
import { IWorkerVerifyOtpUseCase } from "../../../Application/interfaces/useCase_Interfaces/Worker/addWorkerVerifyOtpUseCase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { WorkerKYCFileFields } from "../../../Infrastructure/services/storage/multer";
import { IUploadWorkerKycFilesUsecase } from "../../../Application/interfaces/useCase_Interfaces/Worker/uploadWorkerKycFilesUsecase";
import { IAddWorkerUsecase } from "../../../Application/interfaces/useCase_Interfaces/Worker/AddWorkerUsecase";
import { ApiResponse } from "../../presenters/ApiResponse";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";

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

            const savedTempWorker = await this._addWorkerTempUseCase.execute(req);

            return res.status(STATUS.OK).json({
                success: true,
                message: "OTP sent successfully",
                data: savedTempWorker
            });

        } catch (error) {
            next(error);
        }
    };


    verifyWorkerOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { email, otp } = req.body;

            if (!email  || !otp) {
                return res.status(STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Email, tempWorkerId and OTP are required"
                });
            }

            const verified = await this._workerVerifyOtpUseCase.verify(email , otp);

            if (!verified) {
                return res.status(STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Invalid OTP"
                });
            }

            return res.status(STATUS.OK).json({
                success: true,
                message: "OTP verified successfully"
            });

        } catch (error) {
            next(error);
        }
    };


    uploadWorkerKYC = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            // Implementation for uploading worker KYC goes here
            console.log(req.body);

            const { email,idType } = req.body;

            const files = req.files as WorkerKYCFileFields;
            const uploaded = await this._uploadWorkerKycFilesUsecase.execute(files);

            console.log("Uploaded KYC files for worker:", uploaded);

            const workers = await this._addWorkerUsecase.execute(email,idType, uploaded);

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
