import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IAddressController } from "../../Interfaces/Controllers/User/IAddressController";
import { ICreateAddressFromLocationUseCase } from "../../../Application/Interfaces/UseCases/User/Address/ICreateAddressFromLocationUseCase";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { ApiResponse } from "../../Presenters/ApiResponse";
import { addUserAddressRequestDTO } from "../../../Application/DTOs/User/AddressDTO";
import { ADDRESS_MESSAGES } from "../../../Infrastructure/Constants/Messages/addressMessages";
import { IAddUserAddressUseCase } from "../../../Application/Interfaces/UseCases/User/Address/IAddUserAddressUseCase";
import { IGetUserAddressesUseCase } from "../../../Application/Interfaces/UseCases/User/Address/IGetUserAddressesUseCase";
import { IDeleteUserAddressUseCase } from "../../../Application/Interfaces/UseCases/User/Address/IDeleteUserAddressUseCase";
import { AppError } from "../../../Domain/Utils/customError";
import { ISetDefaultUserAddressUseCase } from "../../../Application/Interfaces/UseCases/User/Address/ISetDefaultUserAddressUseCase";
import { AUTH_MESSAGES } from "../../../Infrastructure/Constants/Messages/authMessages";

@injectable()
export class AddressController implements IAddressController {
    constructor(
        @inject("ICreateAddressFromLocationUseCase") private _createAddressFromLocationUseCase: ICreateAddressFromLocationUseCase,
        @inject("IAddUserAddressUseCase") private _addUserAddressUseCase: IAddUserAddressUseCase,
        @inject("IGetUserAddressesUseCase") private getUserAddressesUseCase: IGetUserAddressesUseCase,
        @inject("IDeleteUserAddressUseCase") private deleteUserAddressUseCase: IDeleteUserAddressUseCase,
        @inject("ISetDefaultUserAddressUseCase") private setDefaultUserAddressUseCase: ISetDefaultUserAddressUseCase
    ) { };

    reverseGeocode = async (req: Request, res: Response): Promise<Response | void> => {

        const lat = parseFloat(req.query.lat as string);
        const lon = parseFloat(req.query.lon as string);

        const addressData = await this._createAddressFromLocationUseCase.execute(lat, lon);
        return res.status(STATUS.OK).json(ApiResponse.success(
            ADDRESS_MESSAGES.ADDRESS_FETCHED,
            addressData
        ));
    };

    addUserAddress = async (req: Request, res: Response): Promise<Response | void> => {
        const dto = req.body as addUserAddressRequestDTO;
        const userId = req.user?.id;
        if (!userId) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS.NOT_FOUND)

        const result = await this._addUserAddressUseCase.execute(userId, dto);

        return res.status(STATUS.OK).json(ApiResponse.success(
            ADDRESS_MESSAGES.ADDRESS_CREATED,
            result
        ));
    };

    getAddresses = async (req: Request, res: Response): Promise<Response | void> => {
        const userId = req.user?.id;
        if (!userId) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS.NOT_FOUND)

        const addresses = await this.getUserAddressesUseCase.execute(userId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(ADDRESS_MESSAGES.ADDRESSES_FETCHED, addresses)
        );
    };

    deleteAddress = async (req: Request, res: Response): Promise<Response | void> => {
        const userId = req.user?.id;
        if (!userId) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS.NOT_FOUND)

        const { addressId } = req.params;
        if (!addressId) throw new AppError(ADDRESS_MESSAGES.ADDRESS_ID_REQUIRED, STATUS.BAD_REQUEST);


        await this.deleteUserAddressUseCase.execute(userId, addressId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(ADDRESS_MESSAGES.ADDRESS_DELETED, STATUS.OK)
        );
    };

    setDefaultAddress = async (req: Request, res: Response): Promise<Response | void> => {

        const userId = req.user?.id;
        if (!userId) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS.NOT_FOUND)

        const { addressId } = req.params;
        if (!addressId) throw new AppError(ADDRESS_MESSAGES.ADDRESS_ID_REQUIRED, STATUS.BAD_REQUEST);

        await this.setDefaultUserAddressUseCase.execute(
            userId,
            addressId
        );

        return res.status(STATUS.OK).json(
            ApiResponse.success(ADDRESS_MESSAGES.DEFAULT_ADDRESS_SET, STATUS.OK)
        );
    };
}
