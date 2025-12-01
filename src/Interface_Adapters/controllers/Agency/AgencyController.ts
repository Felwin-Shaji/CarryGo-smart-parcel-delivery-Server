import { Request, Response, NextFunction } from "express";
import { IAgencyController } from "../../../Application/interfaces/Controllers_Interfaces/Agency_Interfases/agency.controller";
import { inject, injectable } from "tsyringe";
import { AgencyMapper } from "../../../Application/Mappers/AgencyMapper";
import { IUploadAgencyKycFilesUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/UploadAgencyKycFilesUseCase";
import { ISaveAgencyKycUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/SaveAgencyKycUseCase";
import { IUpdateAgencyKycStatusUseCase } from "../../../Application/interfaces/useCase_Interfaces/Agency/UpdateAgencyKycStatusUseCase";
import { AppError } from "../../../Domain/utils/customError";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";

@injectable()
export class AgencyController implements IAgencyController {
    constructor(
        @inject("IUploadAgencyKycFilesUseCase") private _uploadFiles: IUploadAgencyKycFilesUseCase,
        @inject("ISaveAgencyKycUseCase") private _saveKYC: ISaveAgencyKycUseCase,
        @inject("IUpdateAgencyKycStatusUseCase") private _updateStatus: IUpdateAgencyKycStatusUseCase,

    ) { }

    submitKYC = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const dto = AgencyMapper.toAgencyKycDTO(req);

            const uploaded = await this._uploadFiles.execute(dto);


            await this._saveKYC.execute(dto, uploaded);


            const agency = await this._updateStatus.execute(dto.agencyId, "REGISTERED");
            if (!agency) throw new AppError("Registration went wrong")
            const response = AgencyMapper.toAgencyKYCResponseDTO(agency)

            return res.status(STATUS.OK).json(response)

        } catch (error) {
            next(error);
        }
    };

}