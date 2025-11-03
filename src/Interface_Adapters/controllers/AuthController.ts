import type { Request, Response } from "express";
import logger from "../../Infrastructure/logger/logger.js";
import { STATUS } from "../../Infrastructure/constants/statusCodes.js";
import { inject, injectable } from "tsyringe";
import type { IAuthController } from "../../Application/interfaces/conytollers/auth.controller.js";
import type { ISendOtpUseCase } from "../../Application/interfaces/useCase/requestOtp.usecase.js";
import type { IVerifyOtpUseCase } from "../../Application/interfaces/useCase/verifyOtp.interface.js";


@injectable()
export class AuthController implements IAuthController {
    constructor(
        @inject("ISendOtpUseCase")
        private _sendOtpUseCase: ISendOtpUseCase,

        @inject("IVerifyOtpUseCase")
        private _verifyOtpUseCase: IVerifyOtpUseCase
    ) { }
    sendOtp = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { name, email, mobile, password,role } = req.body;
            if (!email) return res.status(STATUS.BAD_REQUEST).json({ success: false, message: "email required" });

            const sendOtpDto = {
                name,
                email,
                mobile,
                password,
                role
            }

            const result = await this._sendOtpUseCase.execute(sendOtpDto);
            console.log(result)
            return res.json({ success: true, message: "Otp send", email, role:result.role});
        } catch (err: any) {
            logger.debug("error at Auth controller ");
            return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ err: err.message });
        };
    };

    varifyOtp = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {email,otp} = req.body;

            await this._verifyOtpUseCase.execute(email,otp);
            console.log("hdhdhdhdhdhdhdhdhdhdhdhdhdhdh")

            return res.json({ meaasge: "user registred" });
        } catch (error: any) {
            logger.debug("error at Auth controller ");
            return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ err: error.meaasge });
        }
    }
};