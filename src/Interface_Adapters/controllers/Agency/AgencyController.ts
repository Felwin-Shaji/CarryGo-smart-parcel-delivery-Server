import { Request, Response, NextFunction } from "express";
import { IAgencyController } from "../../../Application/interfaces/Controllers_Interfaces/Agency_Interfases/agency.controller";
import { inject, injectable } from "tsyringe";
import { IUploadAgencyKycFilesUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/UploadAgencyKycFilesUseCase";
import { ISaveAgencyKycUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/SaveAgencyKycUseCase";
import { IUpdateAgencyKycStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/UpdateAgencyKycStatusUseCase";
import { AppError } from "../../../Domain/utils/customError";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { AgencyKYC_DTO, AgencyKYCResponseDTO, AgencyResubmitKycDTO } from "../../../Application/Dto/Agency/agency.dto";
import { AgencyKYCFileFields } from "../../../Infrastructure/services/storage/multer";
import { ApiResponse } from "../../presenters/ApiResponse";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";
import { IGetAgencyWithKYCUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/GetAgencyWithKYCUseCase";
import { IRsubmitAgencyKycUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/ResubmitAgencyKycUseCase";

@injectable()
export class AgencyController implements IAgencyController {
    constructor(
        @inject("IUploadAgencyKycFilesUseCase") private _uploadFiles: IUploadAgencyKycFilesUseCase,
        @inject("ISaveAgencyKycUseCase") private _saveKYC: ISaveAgencyKycUseCase,
        @inject("IUpdateAgencyKycStatusUseCase") private _updateStatus: IUpdateAgencyKycStatusUseCase,

        @inject("IGetAgencyWithKYCUseCase") private _getAgencyWithKYCUseCase: IGetAgencyWithKYCUseCase,

        @inject("IRsubmitAgencyKycUseCase") private _rsubmitAgencyKycUseCase: IRsubmitAgencyKycUseCase,

    ) { }

    submitKYC = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => { //////////////////////
        try {

            const dto = req.body as AgencyKYC_DTO
            const files = req.files as AgencyKYCFileFields;
            const uploaded = await this._uploadFiles.execute(files);

            dto.status = "REGISTERED";

            await this._saveKYC.execute(dto, uploaded);

            const agencyStauts = await this._updateStatus.execute(dto.id, dto);

            return res.status(STATUS.OK).json(
                ApiResponse.success(AGENCY_MESSAGES.KYC_SUBMITED, agencyStauts)
            )

        } catch (error) {
            next(error);
        }
    };

    getReSubmitKyc = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => { //////////////////////
        try {
            const agencyId = req.params.id;

            if (!agencyId) throw new AppError(AGENCY_MESSAGES.ID_MISSING, STATUS.BAD_REQUEST);

            const result = await this._getAgencyWithKYCUseCase.execute(agencyId);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    AGENCY_MESSAGES.FETCH_AGENCY_WITH_KYC,
                    result
                )
            );

        } catch (error) {
            next(error);
        }
    }

    reSubmitKyc = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => { //////////////////////
        try {
            const dto = req.body as AgencyResubmitKycDTO
            const files = req.files as AgencyKYCFileFields;
            const uploaded = await this._uploadFiles.execute(files);



             await this._rsubmitAgencyKycUseCase.execute(dto,uploaded);

            return res.status(STATUS.OK).json(
                ApiResponse.success(AGENCY_MESSAGES.KYC_RESUBMITED)
            )
        
        } catch (error) {
            next(error);
        }

    }
}