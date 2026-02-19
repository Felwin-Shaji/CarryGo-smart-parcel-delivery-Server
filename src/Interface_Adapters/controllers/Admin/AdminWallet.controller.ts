import { Request, Response, NextFunction } from "express";
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
import { IWalletTopupSuccessUseCase } from "../../../Application/interfaces/useCase_Interfaces/Wallet/IWalletTopupSuccessUseCase";
import { IAdminWalletController } from "../../Interface/Controllers_Interfaces/Admin_Interfaces/IAdminWalletController";
import { IWithdrawWalletMoneyUseCase } from "../../../Application/interfaces/useCase_Interfaces/Wallet/IWithdrawWalletMoneyUseCase";

@injectable()
export class AdminWalletController implements IAdminWalletController {
    constructor(
        @inject("IGetWalletOverviewUseCase") private _getWalletOverviewUseCase: IGetWalletOverviewUseCase,
        @inject("ICreateWalletTopupOrderUseCase") private _createWalletTopupOrderUseCase: ICreateWalletTopupOrderUseCase,
        @inject("IWalletTopupSuccessUseCase") private _walletTopupSuccessUseCase: IWalletTopupSuccessUseCase,
        @inject("IWithdrawWalletMoneyUseCase") private _withdrawWalletMoneyUseCase: IWithdrawWalletMoneyUseCase,
    ) { }
    getAdminWalletOverview = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            const userId = req.user?.id;
            if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

            const response = await this._getWalletOverviewUseCase.execute({ ownerId: userId, ownerType: Role.ADMIN })

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    WALLET_MESSAGES.GET_WALLET_SUCCESS,
                    response
                )
            )

        } catch (error) {
            next(error)
        }
    };

    createAddMoneyOrder = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
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

        } catch (error) {
            next(error)
        }
    }

    withdrawMoney = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);
            const amount = Number(req.body.amount);

            const result = await this._withdrawWalletMoneyUseCase.execute(Role.ADMIN, userId, amount);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    WALLET_MESSAGES.WITHDRAWED_SUCCESS,
                    result)
            );

        } catch (error) {
            next(error)
        }
    }
}