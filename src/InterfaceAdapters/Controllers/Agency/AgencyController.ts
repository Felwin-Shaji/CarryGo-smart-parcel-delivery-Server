import { Request, Response } from "express";
import { IAgencyController } from "../../Interfaces/Controllers/Agency/agency.controller";
import { inject, injectable } from "tsyringe";
import { IUploadAgencyKycFilesUseCase } from "../../../Application/Interfaces/UseCases/Agency/UploadAgencyKycFilesUseCase";
import { ISaveAgencyKycUseCase } from "../../../Application/Interfaces/UseCases/Agency/SaveAgencyKycUseCase";
import { IUpdateAgencyKycStatusUseCase } from "../../../Application/Interfaces/UseCases/Agency/UpdateAgencyKycStatusUseCase";
import { AppError } from "../../../Domain/Utils/customError";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { AgencyKYC_DTO, AgencyResubmitKycDTO } from "../../../Application/DTOs/Agency/AgencyDTO";
import { AgencyKYCFileFields } from "../../../Infrastructure/Services/Storage/multer";
import { ApiResponse } from "../../Presenters/ApiResponse";
import { AGENCY_MESSAGES } from "../../../Infrastructure/Constants/Messages/agencyMessages";
import { IGetAgencyWithKYCUseCase } from "../../../Application/Interfaces/UseCases/Agency/GetAgencyWithKYCUseCase";
import { IRsubmitAgencyKycUseCase } from "../../../Application/Interfaces/UseCases/Agency/ResubmitAgencyKycUseCase";

@injectable()
export class AgencyController implements IAgencyController {
    constructor(
        @inject("IUploadAgencyKycFilesUseCase") private _uploadFiles: IUploadAgencyKycFilesUseCase,
        @inject("ISaveAgencyKycUseCase") private _saveKYC: ISaveAgencyKycUseCase,
        @inject("IUpdateAgencyKycStatusUseCase") private _updateStatus: IUpdateAgencyKycStatusUseCase,

        @inject("IGetAgencyWithKYCUseCase") private _getAgencyWithKYCUseCase: IGetAgencyWithKYCUseCase,
        @inject("IRsubmitAgencyKycUseCase") private _rsubmitAgencyKycUseCase: IRsubmitAgencyKycUseCase,

    ) { }

    submitKYC = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.body as AgencyKYC_DTO
        const files = req.files as AgencyKYCFileFields;
        const uploaded = await this._uploadFiles.execute(files);

        dto.status = "REGISTERED";

        await this._saveKYC.execute(dto, uploaded);

        const agencyStauts = await this._updateStatus.execute(dto.id, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(AGENCY_MESSAGES.KYC_SUBMITED, agencyStauts)
        )

    };

    getReSubmitKyc = async (req: Request, res: Response): Promise<Response | void> => {
        const agencyId = req.params.id;

        if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

        const result = await this._getAgencyWithKYCUseCase.execute(agencyId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                AGENCY_MESSAGES.FETCH_AGENCY_WITH_KYC,
                result
            )
        );
    }

    reSubmitKyc = async (req: Request, res: Response): Promise<Response | void> => {

        const dto = req.body as AgencyResubmitKycDTO

        await this._rsubmitAgencyKycUseCase.execute(dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(AGENCY_MESSAGES.KYC_RESUBMITED)
        )
    }
}