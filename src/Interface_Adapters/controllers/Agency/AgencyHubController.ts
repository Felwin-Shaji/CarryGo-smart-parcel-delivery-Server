import { Request, Response, NextFunction } from "express";
import { IAgencyHubController } from "../../../Application/interfaces/Controllers_Interfaces/Agency_Interfases/IAgencyHub.controller";
import { inject, injectable } from "tsyringe";
import { AgencyMapper } from "../../../Application/Mappers/AgencyMapper";
import { IUploadAddFilesUseCase } from "../../../Application/interfaces/useCase_Interfaces/Hub/IUploadAddFilesUseCase";
import { IAddHubUseCase } from "../../../Application/interfaces/useCase_Interfaces/Hub/IAddHubUseCase";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";


@injectable()
export class AgencyHubController implements IAgencyHubController {
    constructor(
        @inject("IUploadAddFilesUseCase") private _uploadAddFilesUseCase: IUploadAddFilesUseCase,
        @inject("IAddHubUseCase") private _addHubUseCase: IAddHubUseCase
    ) { }


    addNewHub = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const value = AgencyMapper.toAddHubDTO(req)
            const imgUrl = await this._uploadAddFilesUseCase.execute(value);
            console.log(imgUrl)
            const savedHub = await this._addHubUseCase.execute(value, imgUrl)

            const response = AgencyMapper.toAddHubResponse(savedHub.id!)

            return res.status(STATUS.CREATED).json(response);

        } catch (error) {
            next(error)
        }
    }
}