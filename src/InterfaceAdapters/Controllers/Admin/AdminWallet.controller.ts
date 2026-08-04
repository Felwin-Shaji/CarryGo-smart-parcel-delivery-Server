import { Request, Response } from "express";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { ApiResponse } from "../../Presenters/ApiResponse";
import { AppError } from "../../../Domain/Utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/Constants/Messages/userMessage";
import { inject, injectable } from "tsyringe";
import { IGetWalletOverviewUseCase } from "../../../Application/Interfaces/UseCases/Wallet/IGetWalletOverviewUseCase";
import { Role } from "../../../Domain/Enums/Roles";
import { WALLET_MESSAGES } from "../../../Infrastructure/Constants/Messages/walletMessages";
import { ICreateWalletTopupOrderUseCase } from "../../../Application/Interfaces/UseCases/Wallet/ICreateWalletTopupOrderUseCase";
import { IAdminWalletController } from "../../Interfaces/Controllers/Admin/IAdminWalletController";
import { IWithdrawWalletMoneyUseCase } from "../../../Application/Interfaces/UseCases/Wallet/IWithdrawWalletMoneyUseCase";

@injectable()
export class AdminWalletController implements IAdminWalletController {
    constructor(
        @inject("IGetWalletOverviewUseCase") private _getWalletOverviewUseCase: IGetWalletOverviewUseCase,
        @inject("ICreateWalletTopupOrderUseCase") private _createWalletTopupOrderUseCase: ICreateWalletTopupOrderUseCase,
        @inject("IWithdrawWalletMoneyUseCase") private _withdrawWalletMoneyUseCase: IWithdrawWalletMoneyUseCase,
    ) { }
    getAdminWalletOverview = async (req: Request, res: Response): Promise<Response | void> => {

        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

        const response = await this._getWalletOverviewUseCase.execute({ ownerId: userId, ownerType: Role.ADMIN })

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                WALLET_MESSAGES.GET_WALLET_SUCCESS,
                response
            )
        )

    };

    createAddMoneyOrder = async (req: Request, res: Response): Promise<Response | void> => {

        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

        const amount = req.body.amount
        const order = await this._createWalletTopupOrderUseCase.execute(Role.ADMIN, userId, Number(amount));

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                WALLET_MESSAGES.ORDER_CREATED,
                order
            )
        )
    }

    withdrawMoney = async (req: Request, res: Response) => {

        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);
        const amount = Number(req.body.amount);

        const result = await this._withdrawWalletMoneyUseCase.execute(Role.ADMIN, userId, amount);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                WALLET_MESSAGES.WITHDRAWED_SUCCESS,
                result)
        );
    }
}