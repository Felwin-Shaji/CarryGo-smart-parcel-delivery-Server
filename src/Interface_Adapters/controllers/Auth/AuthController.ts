import type { NextFunction, Request, Response } from "express";
import { STATUS } from "../../../Infrastructure/constants/statusCodes.js";
import { inject, injectable } from "tsyringe";
import type { IAuthController } from "../../../Application/interfaces/Controllers_Interfaces/Auth_Interfases/auth.controller.js";
import { AuthMapper } from "../../../Application/Mappers/AuthMapper.js";
import { setAuthCookies } from "../../../Domain/utils/setAuthCookies.js";
import { AppError } from "../../../Domain/utils/customError.js";
import type { ForgotPasswordDTO, UserDTO } from "../../../Application/Dto/Auth/Auth.dto.js";
import type { ILogoutUsecase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/logout.usecase.js";
import type { IRegisterUserUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/RegisterUser.useCase.js";
import type { IRegisterAgencyUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/Agencyregisrtation.usecase.js";
import { ISendOtpUseCase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/requestOtp.usecase.js";
import { IResendOtpUseCase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/resendOtp.usecase.js";
import { IVerifyOtpUseCase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/verifyOtp.interface.js";
import { IGenerateTokenUseCase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/GenerateToken.usecase.js";
import { IRefreshTokenUseCase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/refreshToken.usecase.js";
import { ILoginUsecase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/login.usecase.js";
import { IVarifyEmailUseCase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/varifyEmail.usecase.js";
import { IResetPasswordUseCase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/resetPassword.usecase.js";



@injectable()
export class AuthController implements IAuthController {
    constructor(
        @inject("ISendOtpUseCase") private _sendOtpUseCase: ISendOtpUseCase,
        @inject("IResendOtpUseCase") private _resendOtpUseCase: IResendOtpUseCase,
        @inject("IVerifyOtpUseCase") private _verifyOtpUseCase: IVerifyOtpUseCase,

        @inject("IRegisterUserUseCase") private _registerUserUseCase: IRegisterUserUseCase,
        @inject("IRegisterAgencyUseCase") private _registerAgencyUseCase: IRegisterAgencyUseCase,

        @inject("IGenerateTokenUseCase") private _generateTokenUseCase: IGenerateTokenUseCase,
        @inject("IRefreshTokenUseCase") private _refreshTokenUseCase: IRefreshTokenUseCase,

        @inject("ILoginUsecase") private _loginUsecase: ILoginUsecase,
        @inject("ILogoutUsecase") private _logoutUsecase: ILogoutUsecase,

        @inject("IVarifyEmailUseCase") private _varifyEmailUseCase: IVarifyEmailUseCase,
        @inject("IResetPasswordUseCase") private _resetPasswordUseCase: IResetPasswordUseCase,
    ) { }
    sendOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            if (req.body.isResend) {

                const dto = AuthMapper.toResendOtpDTO(req);

                if (!req.body.email) {
                    return res.status(STATUS.BAD_REQUEST).json({
                        success: false,
                        message: "Email required"
                    });
                }

                const result = await this._resendOtpUseCase.execute(dto);
                const response = AuthMapper.toSendOtpResponse(result);

                return res.status(STATUS.OK).json(response);
            }

            const dto = AuthMapper.toSendOtpDTO(req);
            if (!dto.email) return res.status(STATUS.BAD_REQUEST).json({ success: false, message: "email required" });

            const result = await this._sendOtpUseCase.execute(dto);
            const response = AuthMapper.toSendOtpResponse(result);

            return res.status(STATUS.OK).json(response);

        } catch (error) {
            next(error)
        }


    };

    verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { email, otp, role } = req.body;

            const otpData = await this._verifyOtpUseCase.execute(otp, email);
            if (!otpData) throw new AppError("Invalid or expired OTP", STATUS.UNAUTHORIZED);

            const userData: UserDTO = {
                name: otpData.name,
                email: email,
                mobile: otpData.mobile ?? null,
                password: otpData.password ?? null,
                role: otpData.role,
            };

            let registeredUser;
            if (role === "user") registeredUser = await this._registerUserUseCase.execute(userData);
            if (role === "agency") registeredUser = await this._registerAgencyUseCase.execute(userData);

            if (!registeredUser) throw new AppError("registreation failed", STATUS.CONFLICT);


            const tokens = await this._generateTokenUseCase.execute(
                registeredUser._id!,
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

            const response = AuthMapper.ToSendVerifyOtpResponse(registeredUser._id!, registeredUser.name, email, role, registeredUser.kycStatus, tokens.accessToken);
            return res.status(STATUS.CREATED).json(response);

        } catch (error) {
            next(error);
        }
    };

    refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { role } = req.body
            const refreshToken = req.cookies[`${role}refreshTokenName`];

            if (!refreshToken) {
                return res.status(STATUS.OK).json({
                    success: true,
                    user: null,
                    accessToken: null,
                });
            }

            const tokens = await this._refreshTokenUseCase.execute(refreshToken);
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

            const users = await this._loginUsecase.execute(loginData);

            const tokens = await this._generateTokenUseCase.execute(users._id, users.email, users.role)

            setAuthCookies(
                res,
                tokens.accessToken,
                tokens.refreshToken,
                `${loginData.role}accessTokenName`,
                `${loginData.role}refreshTokenName`
            );

            const response = AuthMapper.ToSendLoginResponse(tokens.user?._id!, tokens.user?.name!, loginData.email, loginData.role, users.kycStatus, tokens.accessToken);

            return res.status(STATUS.OK).json(response);

        } catch (error) {
            next(error)
        }
    }

    logout = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const logoutData = AuthMapper.toLogoutDTO(req)
            const refreshTokenName = `${logoutData.role}refreshTokenName`;
            const refreshToken = req.cookies?.[refreshTokenName];

            if (!refreshToken) throw new AppError("No refresh token found in cookies", 400)

            await this._logoutUsecase.execute(refreshToken, logoutData.id);

            res.clearCookie(`${logoutData.role}accessTokenName`, { httpOnly: true, sameSite: "strict", secure: true });
            res.clearCookie(`${logoutData.role}refreshTokenName`, { httpOnly: true, sameSite: "strict", secure: true });
            const response = AuthMapper.toSendLogoutResponse();
            return res.status(STATUS.OK).json(response)

        } catch (error) {
            next(error)
        }
    }

    forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const dto: ForgotPasswordDTO = {
                email: req.body.email,
                role: req.body.role
            }

            const result = await this._varifyEmailUseCase.execute(dto);

            return res.status(STATUS.OK).json({
                success: true,
                message: "Reset link sent to your email"
            });

        } catch (error) {
            next(error)
        }
    }

    resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const token = req.params.token;
            const { password, role } = req.body;

            if (!token) {
                return res.status(STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Reset token missing"
                });
            }

            await this._resetPasswordUseCase.execute({ token, newPassword: password, role });

            return res.status(STATUS.OK).json({
                success: true,
                message: "Reset link sent to your email"
            });

        } catch (error) {
            next(error)
        }
    }

};