import type { Request, Response } from "express";
import { SendOtpUseCase } from "../../Application/useCase/send-otp.usecase.js";
import logger from "../../Infrastructure/logger/logger.js";
import { STATUS } from "../../Infrastructure/constants/statusCodes.js";


export class AuthController<T, U> {
    constructor(
        private _sendOtpUseCase: SendOtpUseCase<T, U>
    ) { }
    sentOtp = async (req: Request, res: Response) => {
        try {
            const { name, email, mobile, password } = req.body;
            if (!email) return res.status(STATUS.BAD_REQUEST).json({ success: false, message: "email required" });

            await this._sendOtpUseCase.execute(name, email, mobile, password);
            return res.json({ success: true, message: "Otp send" });
        } catch (err:any) {
            logger.debug("error at Auth controller ")
            return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ err: err.message });
        };
    };
};