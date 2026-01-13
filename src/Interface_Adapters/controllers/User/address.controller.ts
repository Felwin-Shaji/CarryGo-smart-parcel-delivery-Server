import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { IAddressController } from "../../Interface/Controllers_Interfaces/User_interfaces/IAddressController";
import { ICreateAddressFromLocationUseCase } from "../../../Application/interfaces/useCase_Interfaces/user/Address/ICreateAddressFromLocationUseCase";
import { STATES } from "mongoose";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";

@injectable()
export class AddressController implements IAddressController {
    constructor(
        @inject("ICreateAddressFromLocationUseCase") private _createAddressFromLocationUseCase: ICreateAddressFromLocationUseCase
    ) { };

     reverseGeocode = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            const lat = parseFloat(req.query.lat as string);
            const lon = parseFloat(req.query.lon as string);

            const addressData = await this._createAddressFromLocationUseCase.execute(lat, lon);
            return res.status(STATUS.OK).json(ApiResponse.success(
                "Address fetched successfully",
                addressData
            ));
   
        } catch (error) {
            next(error);
        };
    }
}
