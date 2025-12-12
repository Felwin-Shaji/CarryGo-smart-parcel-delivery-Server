import { Request, Response, NextFunction } from "express";
import { IAgencyHubController } from "../../../Application/interfaces/Controllers_Interfaces/Agency_Interfases/IAgencyHub.controller";
import { inject, injectable } from "tsyringe";
import { IUploadAddFilesUseCase } from "../../../Application/interfaces/useCase_Interfaces/Hub/IUploadAddFilesUseCase";
import { IAddHubUseCase } from "../../../Application/interfaces/useCase_Interfaces/Hub/IAddHubUseCase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { AddNewHubAddressDto, AddNewHubBaseDto, AddNewHubVerifyOtpDTO } from "../../../Application/Dto/Agency/agency.dto";
import { IAddHubTempUseCase } from "../../../Application/interfaces/useCase_Interfaces/Hub/IAddHubTempUseCase";
import { IAddNewHubResendOtp } from "../../../Application/interfaces/useCase_Interfaces/Hub/IAddNewHubResendOtp";
import { IAddNewHubVerifyOtpUseCase } from "../../../Application/interfaces/useCase_Interfaces/Hub/IAddNewHubVerifyOtpUseCase";
import { AgencyAddHubFields } from "../../../Infrastructure/services/storage/multer";
import { ICheckTempHubStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/Hub/ICheckTempHubStatusUseCase";
import { ApiResponse } from "../../presenters/ApiResponse";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";



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

    checkTempStatus = async (req: Request, res: Response, next: NextFunction) => { ////////////////////////
        try {
            const email = req.query.email as string;

            const result = await this._checkTempHubStatusUseCase.execute(email);

            return res.status(STATUS.OK).json(ApiResponse.success(AGENCY_MESSAGES.STATUS_CHECHED_SUCCESS, result));

        } catch (error) {
            next(error);
        }
    };


    addNewHubBasicInfo = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {///////////////
        try {
            const dto = req.body as AddNewHubBaseDto

            const tempHub = await this._addHubTempUseCase.execute(dto);

            return res.status(STATUS.CREATED).json(
                ApiResponse.success(
                    AGENCY_MESSAGES.OTP_SENT_SUCCESSFULLY,
                    {
                        tempHubId: tempHub.id,
                        email: tempHub.email,
                        expiresAt: tempHub.expiresAt
                    }
                )
            );

        } catch (error) {
            next(error);
        }
    };

    addNewHubVerifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => { /////////////////
        try {
            const dto = req.body as AddNewHubVerifyOtpDTO;

            const verified = await this._addNewHubVerifyOtpUseCase.verify(dto);

            if (!verified) return res.status(STATUS.BAD_REQUEST).json(ApiResponse.failure(AGENCY_MESSAGES.INVALID_OTP));

            return res.status(STATUS.OK).json(ApiResponse.success(AGENCY_MESSAGES.OTP_SENT_SUCCESSFULLY, { verified }));

        } catch (error) {
            next(error);
        }
    };

    addNewHubResendOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {////////////////
        try {
            const { email } = req.body;

            const result = await this._addNewHubResendOtp.resend(email);

            return res.status(STATUS.OK).json(ApiResponse.success(AGENCY_MESSAGES.OTP_RESENT, result));

        } catch (error) {
            next(error);
        }
    };

    addNewHub = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => { ////////////////
        try {
            const { tempHubId } = req.body
            const files = req.files as AgencyAddHubFields;
            const imgUrl = await this._uploadAddFilesUseCase.execute(files);

            const values = req.body as AddNewHubAddressDto;

            console.log(imgUrl);
            const savedHub = await this._addHubUseCase.execute(tempHubId, values, imgUrl);

            return res.status(STATUS.CREATED).json(ApiResponse.success(AGENCY_MESSAGES.HUB_ADDED_SUCCESSFULLY, savedHub));///////////////

        } catch (error) {
            next(error)
        }
    }
}

export interface agencyAddHubResponseDTO {
    id: string;
    name: string;
    email: string;
    role: string;
    kycStatus: string;
}