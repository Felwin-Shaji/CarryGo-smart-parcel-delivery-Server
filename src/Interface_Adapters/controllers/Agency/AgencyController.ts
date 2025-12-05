import { Request, Response, NextFunction } from "express";
import { IAgencyController } from "../../../Application/interfaces/Controllers_Interfaces/Agency_Interfases/agency.controller";
import { inject, injectable } from "tsyringe";
import { IUploadAgencyKycFilesUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/UploadAgencyKycFilesUseCase";
import { ISaveAgencyKycUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/SaveAgencyKycUseCase";
import { IUpdateAgencyKycStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/UpdateAgencyKycStatusUseCase";
import { AppError } from "../../../Domain/utils/customError";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { AgencyMapper } from "../../../Application/Mappers/Agency/AgencyMapper";
import { AgencyKYC_DTO, AgencyKYCResponseDTO } from "../../../Application/Dto/Agency/agency.dto";
import { AgencyKYCFileFields } from "../../../Infrastructure/services/storage/multer";
import { ApiResponse } from "../../presenters/ApiResponse";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";

@injectable()
export class AgencyController implements IAgencyController {
    constructor(
        @inject("IUploadAgencyKycFilesUseCase") private _uploadFiles: IUploadAgencyKycFilesUseCase,
        @inject("ISaveAgencyKycUseCase") private _saveKYC: ISaveAgencyKycUseCase,
        @inject("IUpdateAgencyKycStatusUseCase") private _updateStatus: IUpdateAgencyKycStatusUseCase,

    ) { }

    submitKYC = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            const dto = req.body as AgencyKYC_DTO
            const files = req.files as AgencyKYCFileFields;
            const uploaded = await this._uploadFiles.execute(files);

            console.log(dto,'dtoooooooooooooooooooo')

            await this._saveKYC.execute(dto, uploaded);

            const agency = await this._updateStatus.execute(dto.id, "REGISTERED");
            if (!agency) throw new AppError("Registration went wrong")

            const responseData = agency as AgencyKYCResponseDTO
            console.log(responseData,'lllllllllllllllllllllllll')

            return res.status(STATUS.OK).json(
                ApiResponse.success<AgencyKYCResponseDTO>(AGENCY_MESSAGES.KYC_SUBMITED,responseData)
            )

        } catch (error) {
            next(error);
        }
    };

}