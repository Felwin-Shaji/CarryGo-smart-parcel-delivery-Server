import type { NextFunction, Request, Response } from "express";
import { STATUS } from "../../Infrastructure/constants/statusCodes.js";
import { inject, injectable } from "tsyringe";
import type { IAuthController } from "../../Application/interfaces/conytollers/auth.controller.js";
import type { ISendOtpUseCase } from "../../Application/interfaces/useCase/requestOtp.usecase.js";
import type { IVerifyOtpUseCase } from "../../Application/interfaces/useCase/verifyOtp.interface.js";
import { AuthMapper } from "../../Application/Mappers/AuthMapper.js";
import { setAuthCookies } from "../../Domain/utils/setAuthCookies.js";
import { AppError } from "../../Domain/utils/customError.js";
import type { IGenerateTokenUseCase } from "../../Application/interfaces/useCase/GenerateToken.usecase.js";
import type { IRegisterUserUseCase } from "../../Application/interfaces/useCase/RegisterUser.useCase.js";
import type { IRefreshTokenUseCase } from "../../Application/interfaces/useCase/refreshToken.usecase.js";
import type { UserDTO } from "../../Application/Dto/Auth/Auth.dto.js";
import type { ILoginUsecase } from "../../Application/interfaces/useCase/login.usecase.js";


@injectable()
export class AuthController implements IAuthController {
    constructor(
        @inject("ISendOtpUseCase")
        private _sendOtpUseCase: ISendOtpUseCase,

        @inject("IVerifyOtpUseCase")
        private _verifyOtpUseCase: IVerifyOtpUseCase,

        @inject("IRegisterUserUseCase")
        private _registerUserUseCase: IRegisterUserUseCase,

        @inject("IGenerateTokenUseCase")
        private _generateTokenUseCase: IGenerateTokenUseCase,

        @inject("IRefreshTokenUseCase")
        private _refreshTokenUseCase: IRefreshTokenUseCase,

        @inject("ILoginUsecase")
        private _loginUsecase: ILoginUsecase
    ) { }
    sendOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

        const dto = AuthMapper.toSendOtpDTO(req);
        if (!dto.email) return res.status(STATUS.BAD_REQUEST).json({ success: false, message: "email required" });

        const result = await this._sendOtpUseCase.execute(dto);
        const response = AuthMapper.toSendOtpResponse(result);

        return res.status(STATUS.OK).json(response);

    };

    verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { email, otp, role } = req.body;
            console.log(req.body, "...................body.................")

            const otpData = await this._verifyOtpUseCase.execute(otp, email);
            if (!otpData) throw new AppError("Invalid or expired OTP", STATUS.UNAUTHORIZED);

            const userData: UserDTO = {
                name: otpData.name,
                email: email,
                mobile: otpData.mobile ?? null,
                password: otpData.password ?? null,
                role: otpData.role,
            };

            const registeredUser = await this._registerUserUseCase.execute(userData);


            const tokens = await this._generateTokenUseCase.execute(
                registeredUser.id!,
                registeredUser.email,
                registeredUser.role
            );

            setAuthCookies(
                res,
                tokens.accessToken,
                tokens.refreshToken,
                `${role}accessTokenName`,
                `${role}refreshTokenName`
            )

            const response = AuthMapper.ToSendVerifyOtpResponse(registeredUser.id!, registeredUser.name, email, role, tokens.accessToken);
            console.log(response, "........sss..............")
            return res.status(STATUS.CREATED).json(response);

        } catch (error) {
            next(error);
        }
    };

    refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const refreshToken = req.cookies?.userrefreshTokenName
            if (!refreshToken) {
                return res.status(STATUS.OK).json({
                    success: true,
                    user: null,
                    accessToken: null,
                });
            }

            const tokens = await this._refreshTokenUseCase.execute(refreshToken);
            console.log(tokens, "/////////////////////////////////");
            setAuthCookies(
                res,
                tokens.accessToken,
                tokens.refreshToken,
                `${tokens.user?.role}accessTokenName`,
                `${tokens.user?.role}refreshTokenName`,
            );

            return res.status(STATUS.OK).json({
                success: true,
                user: tokens.user,
                accessToken: tokens.accessToken,
            });

        } catch (error) {
            next(error)
        };
    };

    login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const loginData = AuthMapper.toLoginDTO(req);
            console.log(loginData,'.................')

            const users = await this._loginUsecase.execute(loginData);
            console.log(users)

            const tokens = await this._generateTokenUseCase.execute(users.id,users.email,users.role)

            setAuthCookies(
                res,
                tokens.accessToken,
                tokens.refreshToken,
                `${loginData.role}accessTokenName`,
                `${loginData.role}refreshTokenName`
            );

            const response = AuthMapper.ToSendLoginResponse(tokens.user?.id!, tokens.user?.name!, loginData.email, loginData.role, tokens.accessToken);
            return res.status(STATUS.OK).json(response);

        } catch (error) {
            next()
        }
    }


};