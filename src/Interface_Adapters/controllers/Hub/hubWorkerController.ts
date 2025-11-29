import { Request, Response, NextFunction } from "express";
import { IHubWorkerController } from "../../../Application/interfaces/Controllers_Interfaces/Hub_interface/HubWorkerController";
import { inject, injectable } from "tsyringe";
import { IAddWorkerTempUseCase } from "../../../Application/interfaces/useCase_Interfaces/Worker/addWorkerUseCase.interface";
import { IWorkerVerifyOtpUseCase } from "../../../Application/interfaces/useCase_Interfaces/Worker/addWorkerVerifyOtpUseCase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";

@injectable()
export class HubWorkerController implements IHubWorkerController {

    constructor(
        @inject("IAddWorkerTempUseCase") private _addWorkerTempUseCase: IAddWorkerTempUseCase,
        @inject("IWorkerVerifyOtpUseCase") private _workerVerifyOtpUseCase: IWorkerVerifyOtpUseCase
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
            const { email, tempWorkerId, otp } = req.body;

            if (!email || !tempWorkerId || !otp) {
                return res.status(STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Email, tempWorkerId and OTP are required"
                });
            }

            const verified = await this._workerVerifyOtpUseCase.verify(email, tempWorkerId, otp);

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

}
