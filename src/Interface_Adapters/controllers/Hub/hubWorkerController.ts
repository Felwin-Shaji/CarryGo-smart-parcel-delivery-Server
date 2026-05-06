import { Request, Response } from "express";
import { IHubWorkerController } from "../../Interface/Controllers_Interfaces/Hub_interface/HubWorkerController";
import { inject, injectable } from "tsyringe";
import { IAddWorkerTempUseCase } from "../../../Application/interfaces/useCase_Interfaces/Worker/addWorkerTempUseCase.interface";
import { IWorkerVerifyOtpUseCase } from "../../../Application/interfaces/useCase_Interfaces/Worker/addWorkerVerifyOtpUseCase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { WorkerKYCFileFields } from "../../../Infrastructure/services/storage/multer";
import { IUploadWorkerKycFilesUsecase } from "../../../Application/interfaces/useCase_Interfaces/Worker/uploadWorkerKycFilesUsecase";
import { IAddWorkerUsecase } from "../../../Application/interfaces/useCase_Interfaces/Worker/AddWorkerUsecase";
import { ApiResponse } from "../../presenters/ApiResponse";
import { WORKER_MESSAGES } from "../../../Infrastructure/constants/messages/workerMessage";
import { AddWorkerTempRequestDTO } from "../../../Application/Dto/Hub/hub.dto";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";
import { AppError } from "../../../Domain/utils/customError";
import { AUTH_MESSAGES } from "../../../Infrastructure/constants/messages/authMessages";
import { GetWorkersDTO, ReSubmitWorkerKycPayloadDTO } from "../../../Application/Dto/Workers/worker.dto";
import { IGetWorkersUseCase } from "../../../Application/interfaces/useCase_Interfaces/Worker/IGetWorkersUseCase";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";
import { ICheckTempWorkerStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/Worker/ICheckTempWorkerStatusUseCase";
import { IGetWorkerOverviewUseCase } from "@/Application/interfaces/useCase_Interfaces/Worker/IGetWorkerOverviewUseCase";
import { IReSubmitWorkerKycUseCase } from "@/Application/interfaces/useCase_Interfaces/Worker/IReSubmitWorkerKycUseCase";
import { IGetWorkerKycUseCase } from "@/Application/interfaces/useCase_Interfaces/Worker/IGetWorkerKycUseCase";
import { parseBlockedQuery } from "@/Domain/utils/utils";
import { Role } from "@/Domain/Enums/Roles";

@injectable()
export class HubWorkerController implements IHubWorkerController {

    constructor(
        @inject("IAddWorkerTempUseCase") private _addWorkerTempUseCase: IAddWorkerTempUseCase,
        @inject("IWorkerVerifyOtpUseCase") private _workerVerifyOtpUseCase: IWorkerVerifyOtpUseCase,

        @inject("IUploadWorkerKycFilesUsecase") private _uploadWorkerKycFilesUsecase: IUploadWorkerKycFilesUsecase,
        @inject("ICheckTempWorkerStatusUseCase") private _checkTempWorkerStatusUseCase: ICheckTempWorkerStatusUseCase,

        @inject("IAddWorkerUsecase") private _addWorkerUsecase: IAddWorkerUsecase,
        @inject("IGetWorkersUseCase") private _getWorkersUseCase: IGetWorkersUseCase,
        @inject("IGetWorkerOverviewUseCase") private _getWorkerOverviewUseCase: IGetWorkerOverviewUseCase,
        @inject("IGetWorkerKycUseCase") private _getWorkerKycUseCase: IGetWorkerKycUseCase,
        @inject("IReSubmitWorkerKycUseCase") private _reSubmitWorkerKycUseCase: IReSubmitWorkerKycUseCase,
    ) { }

    addNewWorker = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.body as AddWorkerTempRequestDTO
        const hubId = req.user?.id;
        if (!hubId) throw new AppError(HUB_MESSAGES.HUBID_MISSING, STATUS.BAD_REQUEST)


        const savedTempWorker = await this._addWorkerTempUseCase.execute(hubId, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                HUB_MESSAGES.OTP_SEND_SICCESS,
                savedTempWorker
            )
        )
    };

    checkTempWorkerStatus = async (req: Request, res: Response) => {

        const email = req.query.email as string;

        console.log(email)

        const result = await this._checkTempWorkerStatusUseCase.execute(email);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                AGENCY_MESSAGES.STATUS_CHECHED_SUCCESS, result
            )
        );
    };


    verifyWorkerOtp = async (req: Request, res: Response): Promise<Response | void> => {

        const { email, otp } = req.body;

        await this._workerVerifyOtpUseCase.verify(email, otp);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                HUB_MESSAGES.OTP_VERIFIED
            )
        )
    };


    uploadWorkerKYC = async (req: Request, res: Response): Promise<Response | void> => {

        const { email, idType, idNumber } = req.body;
        const hubId = req.user?.id;
        if (!hubId) throw new AppError(HUB_MESSAGES.HUBID_MISSING, STATUS.BAD_REQUEST)



        const files = req.files as WorkerKYCFileFields;
        const uploaded = await this._uploadWorkerKycFilesUsecase.execute(files);

        const workers = await this._addWorkerUsecase.execute(email, idType, idNumber, hubId, uploaded);

        console.log(workers);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                WORKER_MESSAGES.WORKER_ADDED_SUCCESSFULLY,
                workers
            )
        );
    };

    getHubWorkers = async (req: Request, res: Response): Promise<Response | void> => {

        let hubId: string | undefined;
        if (req.user?.role === Role.HUB) hubId = req.user.id;
        else hubId = req.params.hubId as string;

        if (!hubId) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND);

        const dto: GetWorkersDTO = {
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

        const hubs = await this._getWorkersUseCase.execute(hubId, dto);

        console.log(hubs);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                WORKER_MESSAGES.LIST_FETCHED,
                hubs
            )
        );
    }

    getHubWorkerById = async (req: Request, res: Response): Promise<Response | void> => {

        const workerId = req.params.id;
        if (!workerId) throw new AppError(WORKER_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

        const worker = await this._getWorkerOverviewUseCase.execute(workerId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                WORKER_MESSAGES.OVERVIEW_FETCHED,
                worker
            )
        );
    }

    getWorkerKycController = async (req: Request, res: Response): Promise<Response | void> => {

        const { id } = req.params;
        if (!id) throw new AppError(WORKER_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

        const data = await this._getWorkerKycUseCase.execute(id);

        return res.status(200).json(
            ApiResponse.success(
                WORKER_MESSAGES.KYC_FOUNDED,
                data
            )
        );
    };

    reSubmitWorkerKycController = async (req: Request, res: Response): Promise<Response | void> => {
        const { id } = req.params;
        if (!id) throw new AppError(WORKER_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

        const files = req.files as WorkerKYCFileFields
        const payload = req.body as ReSubmitWorkerKycPayloadDTO

        await this._reSubmitWorkerKycUseCase.execute(id, payload, files);

        return res.status(200).json(
            ApiResponse.success(
                WORKER_MESSAGES.KYC_RESUBMITTED_SUCCESSFULLY
            )
        );
    };
}
