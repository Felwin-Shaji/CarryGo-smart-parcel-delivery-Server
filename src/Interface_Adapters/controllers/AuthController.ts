import type { Request, Response } from "express";
import logger from "../../Infrastructure/logger/logger.js";
import { STATUS } from "../../Infrastructure/constants/statusCodes.js";
import { inject, injectable } from "tsyringe";
import type { IAuthController } from "../../Application/interfaces/conytollers/auth.controller.js";
import type { ISendOtpUseCase } from "../../Application/interfaces/useCase/requestOtp.usecase.js";
import type { IVerifyOtpAndRegisterUseCase } from "../../Application/interfaces/useCase/verifyOtpAndRegister.interface.js";


@injectable()
export class AuthController implements IAuthController {
    constructor(
        @inject("ISendOtpUseCase")
        private _sendOtpUseCase: ISendOtpUseCase,

        // @inject("IVerifyOtpAndRegisterUseCase")
        // private _verifyOtpAndRegisterUseCase: IVerifyOtpAndRegisterUseCase
    ) { }
    sendOtp = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { name, email, mobile, password } = req.body;
            if (!email) return res.status(STATUS.BAD_REQUEST).json({ success: false, message: "email required" });

            const sendOtpDto = {
                name,
                email,
                mobile,
                password
            }

            await this._sendOtpUseCase.execute(sendOtpDto);
            return res.json({ success: true, message: "Otp send" });
        } catch (err: any) {
            logger.debug("error at Auth controller ");
            return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ err: err.message });
        };
    };

    registerUser = async (req: Request, res: Response): Promise<Response> => {
        try {

            return res.json({ meaasge: "user registred" });
        } catch (error: any) {
            logger.debug("error at Auth controller ");
            return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ err: error.meaasge });
        }
    }
};