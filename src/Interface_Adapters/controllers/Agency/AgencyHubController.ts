import { Request, Response, NextFunction } from "express";
import { IAgencyHubController } from "../../../Application/interfaces/Controllers_Interfaces/Agency_Interfases/IAgencyHub.controller";
import { inject, injectable } from "tsyringe";
import { AgencyMapper } from "../../../Application/Mappers/AgencyMapper";
import { IUploadAddFilesUseCase } from "../../../Application/interfaces/useCase_Interfaces/Hub/IUploadAddFilesUseCase";
import { IAddHubUseCase } from "../../../Application/interfaces/useCase_Interfaces/Hub/IAddHubUseCase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IHubTempRepository } from "../../../Application/interfaces/repositories_interfaces/hubRepositories_Interfaces/hubTemp.repository";
import { AddNewHubAddressDto, AddNewHubBaseDto } from "../../../Application/Dto/Agency/agency.dto";
import { IAddHubTempUseCase } from "../../../Application/interfaces/useCase_Interfaces/Hub/IAddHubTempUseCase";
import { IAddNewHubResendOtp } from "../../../Application/interfaces/useCase_Interfaces/Hub/IAddNewHubResendOtp";
import { IAddNewHubVerifyOtpUseCase } from "../../../Application/interfaces/useCase_Interfaces/Hub/IAddNewHubVerifyOtpUseCase ";
import { AgencyAddHubFields } from "../../../Infrastructure/services/storage/multer";
import { ICheckTempHubStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/Hub/ICheckTempHubStatusUseCase";


@injectable()
export class AgencyHubController implements IAgencyHubController {
    constructor(
        @inject("IUploadAddFilesUseCase") private _uploadAddFilesUseCase: IUploadAddFilesUseCase,

        @inject("IAddHubTempUseCase") private _addHubTempUseCase: IAddHubTempUseCase,

        @inject("IAddNewHubResendOtp") private _addNewHubResendOtp: IAddNewHubResendOtp,

        @inject("IAddHubUseCase") private _addHubUseCase: IAddHubUseCase,

        @inject("IAddNewHubVerifyOtpUseCase") private _addNewHubVerifyOtpUseCase: IAddNewHubVerifyOtpUseCase,

        @inject("ICheckTempHubStatusUseCase") private _checkTempHubStatusUseCase: ICheckTempHubStatusUseCase

    ) { }

    checkTempStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email = req.query.email as string;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: "Email is required"
                });
            }

            const result = await this._checkTempHubStatusUseCase.execute(email);

            return res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    };


    addNewHubBasicInfo = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { name, email, mobile, role, agencyId } = req.body;

            const dto: AddNewHubBaseDto = {
                agencyId,
                name,
                email,
                mobile,
                role
            };

            const tempHub = await this._addHubTempUseCase.execute(dto);

            return res.status(STATUS.CREATED).json({
                success: true,
                message: "OTP sent successfully. Proceed to verification.",
                tempHubId: tempHub.id,
                email: tempHub.email,
                expiresAt: tempHub.expiresAt
            });

        } catch (error) {
            next(error);
        }
    };

    addNewHubVerifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { email, tempHubId, otp } = req.body;

            if (!email || !tempHubId || !otp) {
                return res.status(STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Email, tempHubId and OTP are required"
                });
            }

            const verified = await this._addNewHubVerifyOtpUseCase.verify(email, tempHubId, otp);

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

    addNewHubResendOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Email is required"
                });
            }

            const result = await this._addNewHubResendOtp.resend(email);

            return res.status(STATUS.OK).json({
                success: true,
                message: "OTP resent successfully",
                expiresAt: result.expiresAt
            });

        } catch (error) {
            next(error);
        }
    };

    addNewHub = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { tempHubId } = req.body
            const files = req.files as AgencyAddHubFields;
            const imgUrl = await this._uploadAddFilesUseCase.execute(files);

            const values: AddNewHubAddressDto = {
                addressLine1: req.body.addressLine1,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
                location_lat: req.body.location_lat,
                location_lng: req.body.location_lng
            }

            console.log(imgUrl)
            const savedHub = await this._addHubUseCase.execute(tempHubId, values, imgUrl)

            const response = {
                success: true,
                message: "KYC submitted successfully",
                user: {
                    id: savedHub.id!,
                    name: savedHub.name,
                    email: savedHub.email,
                    role: savedHub.role,
                    kycStatus: savedHub.kycStatus
                },

            };

            return res.status(STATUS.CREATED).json(response);

        } catch (error) {
            next(error)
        }
    }
}