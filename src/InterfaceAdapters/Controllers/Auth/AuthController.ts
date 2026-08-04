import type { Request, Response } from "express";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { inject, injectable } from "tsyringe";
import type { IAuthController } from "../../Interfaces/Controllers/Auth/auth.controller";
import { AuthMapper } from "../../../Application/Mappers/AuthMapper";
import { setAuthCookies } from "../../../Domain/Utils/setAuthCookies";
import { AppError } from "../../../Domain/Utils/customError";
import type { ForgotPasswordDTO, LoginDTO, LogoutDTO, ResetPasswordDTO, SendOtpDTO, UserDTO } from "../../../Application/DTOs/Auth/Auth.dto";
import type { ILogoutUsecase } from "../../../Application/Interfaces/UseCases/Auth/logout.usecase";
import type { IRegisterUserUseCase } from "../../../Application/Interfaces/UseCases/User/RegisterUser.useCase";
import type { IRegisterAgencyUseCase } from "../../../Application/Interfaces/UseCases/Agency/Agencyregisrtation.usecase";
import { ISendOtpUseCase } from "../../../Application/Interfaces/UseCases/Auth/requestOtp.usecase";
import { IResendOtpUseCase } from "../../../Application/Interfaces/UseCases/Auth/resendOtp.usecase";
import { IVerifyOtpUseCase } from "../../../Application/Interfaces/UseCases/Auth/verifyOtp.interface";
import { IGenerateTokenUseCase } from "../../../Application/Interfaces/UseCases/Auth/GenerateToken.usecase";
import { IRefreshTokenUseCase } from "../../../Application/Interfaces/UseCases/Auth/refreshToken.usecase";
import { ILoginUsecase } from "../../../Application/Interfaces/UseCases/Auth/login.usecase";
import { IVarifyEmailUseCase } from "../../../Application/Interfaces/UseCases/Auth/varifyEmail.usecase";
import { IResetPasswordUseCase } from "../../../Application/Interfaces/UseCases/Auth/resetPassword.usecase";
import { ApiResponse } from "../../Presenters/ApiResponse";
import { OTP_MESSAGES } from "../../../Infrastructure/Constants/Messages/otpMessage";
import { AUTH_MESSAGES } from "../../../Infrastructure/Constants/Messages/authMessages";
import { User } from "../../../Domain/Entities/User";
import { RegisterAgencyResponseDTO } from "../../../Application/DTOs/Agency/agency.dto";
import { Role } from "../../../Domain/Enums/Role";
import { IGoogleAuthUseCase } from "../../../Application/Interfaces/UseCases/Auth/IGoogleAuthUseCase";



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

        @inject("IGoogleAuthUseCase") private _googleAuthUseCase: IGoogleAuthUseCase,
    ) { };

    sendOtp = async (req: Request, res: Response): Promise<Response | void> => {
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

    };

    verifyOtp = async (req: Request, res: Response): Promise<Response | void> => {
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
    };

    refreshToken = async (req: Request, res: Response): Promise<Response | void> => {
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
    };

    login = async (req: Request, res: Response): Promise<Response | void> => {
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
    }

    logout = async (req: Request, res: Response): Promise<Response | void> => {
        const { role } = req.body as LogoutDTO;
        const refreshTokenName = `${role}refreshTokenName`;
        const refreshToken = req.cookies?.[refreshTokenName];

        if (!refreshToken) throw new AppError(AUTH_MESSAGES.REFRESH_TOKEN_NOT_FOUND, STATUS.BAD_REQUEST)

        await this._logoutUsecase.execute(refreshToken);

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
    }

    forgotPassword = async (req: Request, res: Response): Promise<Response | void> => {
        const dto = req.body as ForgotPasswordDTO
        await this._varifyEmailUseCase.execute(dto);

        return res.status(STATUS.OK).json({
            success: true,
            message: "Reset link sent to your email"
        });
    }

    resetPassword = async (req: Request, res: Response): Promise<Response | void> => {
        const token = req.params.token;
        const { password, role } = req.body as ResetPasswordDTO;

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
    }

    googleAuth = async (req: Request, res: Response): Promise<Response | void> => {

        const { credential } = req.body;

        if (!credential) throw new AppError(AUTH_MESSAGES.GOOGLE_CREDENTIAL_REQUIRED, STATUS.BAD_REQUEST);


        const result = await this._googleAuthUseCase.execute(credential);

        setAuthCookies(
            res,
            result.accessToken,
            result.refreshToken,
            "useraccessTokenName",
            "userrefreshTokenName"
        );


        const response = AuthMapper.toGoogleAuthResponse(result.users as User, result.accessToken);

        console.log(response);


        return res.status(STATUS.OK).json(
            ApiResponse.success(
                AUTH_MESSAGES.GOOGLE_LOGIN_SUCCESS,
                response.data
            )
        );
    };
};