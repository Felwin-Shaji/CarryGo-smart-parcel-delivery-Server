import { Request, Response } from "express";
import { IWalletController } from "../../Interface/Controllers_Interfaces/User_interfaces/IWalletController";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";
import { AppError } from "../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";
import { inject, injectable } from "tsyringe";
import { IGetWalletOverviewUseCase } from "../../../Application/interfaces/useCase_Interfaces/Wallet/IGetWalletOverviewUseCase";
import { Role } from "../../../Domain/Enums/Roles";
import { WALLET_MESSAGES } from "../../../Infrastructure/constants/messages/walletMessages";
import { ICreateWalletTopupOrderUseCase } from "../../../Application/interfaces/useCase_Interfaces/Wallet/ICreateWalletTopupOrderUseCase";
import { IWithdrawWalletMoneyUseCase } from "../../../Application/interfaces/useCase_Interfaces/Wallet/IWithdrawWalletMoneyUseCase";

@injectable()
export class WalletController implements IWalletController {
    constructor(
        @inject("IGetWalletOverviewUseCase") private _getWalletOverviewUseCase: IGetWalletOverviewUseCase,
        @inject("ICreateWalletTopupOrderUseCase") private _createWalletTopupOrderUseCase: ICreateWalletTopupOrderUseCase,
        @inject("IWithdrawWalletMoneyUseCase") private _withdrawWalletMoneyUseCase: IWithdrawWalletMoneyUseCase,

    ) { }
    getWalletOverview = async (req: Request, res: Response): Promise<Response | void> => {
        const userId = req.user?.id;
        if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

        const response = await this._getWalletOverviewUseCase.execute({ ownerId: userId, ownerType: Role.USER })

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
        const order = await this._createWalletTopupOrderUseCase.execute(Role.USER, userId, Number(amount));

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

        const result = await this._withdrawWalletMoneyUseCase.execute(Role.USER, userId, amount);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                WALLET_MESSAGES.WITHDRAWED_SUCCESS,
                result)
        );
    }
}