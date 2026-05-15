import { Request, Response } from "express";
import { IAgencyHubController } from "../../Interface/Controllers_Interfaces/Agency_Interfases/IAgencyHub.controller";
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
import { GetHubsDTO } from "../../../Application/Dto/Hub/hub.dto";
import { IGetHubsUsecase } from "../../../Application/interfaces/useCase_Interfaces/Hub/IGetHubsUsecase";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";
import { AppError } from "../../../Domain/utils/customError";
import { AUTH_MESSAGES } from "../../../Infrastructure/constants/messages/authMessages";
import { IGetHubOverviewUseCase } from "../../../Application/interfaces/useCase_Interfaces/Hub/IGetHubOverviewUseCase";
import { parseBlockedQuery } from "../../../Domain/utils/utils";


@injectable()
export class AgencyHubController implements IAgencyHubController {
    constructor(
        @inject("IUploadAddFilesUseCase") private _uploadAddFilesUseCase: IUploadAddFilesUseCase,

        @inject("IAddHubTempUseCase") private _addHubTempUseCase: IAddHubTempUseCase,

        @inject("IAddNewHubResendOtp") private _addNewHubResendOtp: IAddNewHubResendOtp,

        @inject("IAddHubUseCase") private _addHubUseCase: IAddHubUseCase,

        @inject("IAddNewHubVerifyOtpUseCase") private _addNewHubVerifyOtpUseCase: IAddNewHubVerifyOtpUseCase,

        @inject("ICheckTempHubStatusUseCase") private _checkTempHubStatusUseCase: ICheckTempHubStatusUseCase,

        @inject("IGetHubsUsecase") private _getHubsUsecase: IGetHubsUsecase,

        @inject("IGetHubOverviewUseCase") private _getHubOverviewUseCase: IGetHubOverviewUseCase,


    ) { }

    checkTempHubStatus = async (req: Request, res: Response) => {

        const email = req.query.email as string;
        const result = await this._checkTempHubStatusUseCase.execute(email);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                AGENCY_MESSAGES.STATUS_CHECHED_SUCCESS,
                result
            )
        );
    };


    addNewHubBasicInfo = async (req: Request, res: Response): Promise<Response | void> => {

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
    };

    addNewHubVerifyOtp = async (req: Request, res: Response): Promise<Response | void> => { /////////////////
        const dto = req.body as AddNewHubVerifyOtpDTO;

        const verified = await this._addNewHubVerifyOtpUseCase.verify(dto);

        if (!verified) return res.status(STATUS.BAD_REQUEST).json(ApiResponse.failure(AGENCY_MESSAGES.INVALID_OTP));

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                AGENCY_MESSAGES.OTP_SENT_SUCCESSFULLY,
                { verified }
            )
        );
    };

    addNewHubResendOtp = async (req: Request, res: Response): Promise<Response | void> => {

        const { email } = req.body;
        const result = await this._addNewHubResendOtp.resend(email);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                AGENCY_MESSAGES.OTP_RESENT,
                result
            )
        );
    };

    addNewHub = async (req: Request, res: Response): Promise<Response | void> => {

        const { tempHubId } = req.body
        const files = req.files as AgencyAddHubFields;
        const imgUrl = await this._uploadAddFilesUseCase.execute(files);

        const values = req.body as AddNewHubAddressDto;

        const savedHub = await this._addHubUseCase.execute(tempHubId, values, imgUrl);

        return res.status(STATUS.CREATED).json(
            ApiResponse.success(
                AGENCY_MESSAGES.HUB_ADDED_SUCCESSFULLY,
                savedHub
            )
        );
    };

    getHubs = async (req: Request, res: Response): Promise<Response | void> => {

        const agencyId = req.user?.id;
        if (!agencyId) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND);

        const dto: GetHubsDTO = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            search: req.query.search?.toString() || "",
            sortBy: req.query.sortBy?.toString() || "createdAt",
            sortOrder: req.query.sortOrder === "desc" ? "desc" : "asc",
            blocked: parseBlockedQuery(req.query.blocked),
            kycStatus: req.query.kycStatus?.toString() || "",
            startDate: req.query.startDate?.toString() || "",
            endDate: req.query.endDate?.toString() || "",
        };

        const result = await this._getHubsUsecase.execute(agencyId, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                HUB_MESSAGES.EMAIL_ALREADY_EXISTS,
                result
            )
        )
    };

    getHubsByAgencyId = async (req: Request, res: Response): Promise<Response | void> => {

        const agencyId = req.params.agencyId;
        if (!agencyId) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND);

        const dto: GetHubsDTO = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            search: req.query.search?.toString() || "",
            sortBy: req.query.sortBy?.toString() || "createdAt",
            sortOrder: req.query.sortOrder === "desc" ? "desc" : "asc",
            blocked: parseBlockedQuery(req.query.blocked),
            kycStatus: req.query.kycStatus?.toString() || "",
            startDate: req.query.startDate?.toString() || "",
            endDate: req.query.endDate?.toString() || "",
        };

        const result = await this._getHubsUsecase.execute(agencyId, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                HUB_MESSAGES.EMAIL_ALREADY_EXISTS,
                result
            )
        )
    };

    getHubById = async (req: Request, res: Response): Promise<Response | void> => {

        const hubId = req.params.id as string;
        const hubOverview = await this._getHubOverviewUseCase.execute(hubId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                HUB_MESSAGES.FETCH_SUCCESS,
                hubOverview
            )
        );
    }
}

export interface agencyAddHubResponseDTO {
    id: string;
    name: string;
    email: string;
    role: string;
    kycStatus: string;
}