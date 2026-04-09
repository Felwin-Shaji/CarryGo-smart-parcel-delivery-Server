import type { NextFunction, Request, Response } from "express";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { inject, injectable } from "tsyringe";
import type { IAuthController } from "../../Interface/Controllers_Interfaces/Auth_Interfases/auth.controller";
import { AuthMapper } from "../../../Application/Mappers/AuthMapper";
import { setAuthCookies } from "../../../Domain/utils/setAuthCookies";
import { AppError } from "../../../Domain/utils/customError";
import type { ForgotPasswordDTO, LoginDTO, LogoutDTO, ResetPasswordDTO, SendOtpDTO, UserDTO } from "../../../Application/Dto/Auth/Auth.dto";
import type { ILogoutUsecase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/logout.usecase";
import type { IRegisterUserUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/RegisterUser.useCase";
import type { IRegisterAgencyUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/Agencyregisrtation.usecase";
import { ISendOtpUseCase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/requestOtp.usecase";
import { IResendOtpUseCase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/resendOtp.usecase";
import { IVerifyOtpUseCase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/verifyOtp.interface";
import { IGenerateTokenUseCase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/GenerateToken.usecase";
import { IRefreshTokenUseCase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/refreshToken.usecase";
import { ILoginUsecase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/login.usecase";
import { IVarifyEmailUseCase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/varifyEmail.usecase";
import { IResetPasswordUseCase } from "../../../Application/interfaces/useCase_Interfaces/AuthUsecase_Interfaces/resetPassword.usecase";
import { ApiResponse } from "../../presenters/ApiResponse";
import { OTP_MESSAGES } from "../../../Infrastructure/constants/messages/otpMessage";
import { AUTH_MESSAGES } from "../../../Infrastructure/constants/messages/authMessages";
import { Role } from "@/Domain/Enums/Roles";
import { User } from "@/Domain/Entities/User";
import { RegisterAgencyResponseDTO } from "@/Application/Dto/Agency/agency.dto";



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
    ) { };

    sendOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const dto = req.body as SendOtpDTO;

            if (dto.isResend) {
                const result = await this._resendOtpUseCase.execute(dto);

                return res.status(STATUS.OK).json(
                    ApiResponse.success(
                        OTP_MESSAGES.OTP_RESENT,
                        result
                    )
                );
            }

            const result = await this._sendOtpUseCase.execute(dto);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    OTP_MESSAGES.OTP_SENT_SUCCESS,
                    result
                )
            );
        } catch (error) {
            next(error);
        }
    };

    verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { email, otp, role } = req.body;

            const otpData = await this._verifyOtpUseCase.execute(otp, email);

            const userData: UserDTO = {
                name: otpData.name,
                email: email,
                mobile: otpData.mobile ?? null,
                password: otpData.password ?? null,
                role: otpData.role,
            };

            let registeredUser: User | RegisterAgencyResponseDTO;
            if (role === Role.USER) registeredUser = await this._registerUserUseCase.execute(userData);
            else if (role === Role.AGENCY) registeredUser = await this._registerAgencyUseCase.execute(userData);
            else throw new AppError(AUTH_MESSAGES.ROLE_NOT_ALLOWED, STATUS.BAD_REQUEST);


            const tokens = await this._generateTokenUseCase.execute(
                registeredUser.id!,
                registeredUser.email,
                registeredUser.role,
                registeredUser.tokenVersion
            );

            setAuthCookies(
                res,
                tokens.accessToken,
                tokens.refreshToken,
                `${role}accessTokenName`,
                `${role}refreshTokenName`
            )

            const response = AuthMapper.ToSendVerifyOtpResponse(registeredUser.id!, registeredUser.name, email, role, registeredUser.kycStatus, tokens.accessToken);
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
                res.clearCookie(`${role}accessTokenName`, { httpOnly: true, sameSite: "strict", secure: true });
                res.clearCookie(`${role}refreshTokenName`, { httpOnly: true, sameSite: "strict", secure: true });
                throw new AppError(AUTH_MESSAGES.REFRESH_TOKEN_NOT_FOUND, STATUS.UNAUTHORIZED)
            }

            const tokens = await this._refreshTokenUseCase.execute(refreshToken);
            setAuthCookies(
                res,
                tokens.accessToken,
                tokens.refreshToken,
                `${tokens.user?.role}accessTokenName`,
                `${tokens.user?.role}refreshTokenName`,
            );


            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    AUTH_MESSAGES.REFRESH_TOKEN_FOUND,
                    { user: tokens.user, accessToken: tokens.accessToken }
                )
            )

        } catch (error) {
            next(error)
        };
    };

    login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const loginData = req.body as LoginDTO

            const users = await this._loginUsecase.execute(loginData);

            const tokens = await this._generateTokenUseCase.execute(users.id, users.email, users.role, users.tokenVersion)

            setAuthCookies(
                res,
                tokens.accessToken,
                tokens.refreshToken,
                `${loginData.role}accessTokenName`,
                `${loginData.role}refreshTokenName`
            );

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    AUTH_MESSAGES.LOGIN_SUCCESS,
                    { users, accessToken: tokens.accessToken }
                )
            );

        } catch (error) {
            next(error)
        }
    }

    logout = async (
        req: Request<{}, {}, LogoutDTO>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {

            const { id, role } = req.body;
            const refreshTokenName = `${role}refreshTokenName`;
            const refreshToken = req.cookies?.[refreshTokenName];

            if (!refreshToken) throw new AppError(AUTH_MESSAGES.REFRESH_TOKEN_NOT_FOUND, STATUS.BAD_REQUEST)

            await this._logoutUsecase.execute(refreshToken, id);

            res.clearCookie(`${role}accessTokenName`, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                path: "/",
            });

            res.clearCookie(`${role}refreshTokenName`, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                path: "/",
            });
            const response = AuthMapper.toSendLogoutResponse();
            return res.status(STATUS.OK).json(response)

        } catch (error) {
            next(error)
        }
    }

    forgotPassword = async (
        req: Request<{}, {}, ForgotPasswordDTO>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const dto = req.body
            await this._varifyEmailUseCase.execute(dto);

            return res.status(STATUS.OK).json({
                success: true,
                message: "Reset link sent to your email"
            });

        } catch (error) {
            next(error)
        }
    }

    resetPassword = async (
        req: Request<{ token: string }, {}, ResetPasswordDTO>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
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