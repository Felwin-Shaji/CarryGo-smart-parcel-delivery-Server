import { Request, Response, NextFunction } from "express";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";
import { AppError } from "../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";
import { inject, injectable } from "tsyringe";
import { IGetWalletOverviewUseCase } from "../../../Application/interfaces/useCase_Interfaces/Wallet/IGetWalletOverviewUseCase";
import { Role } from "../../../Domain/Enums/Roles";
import { WALLET_MESSAGES } from "../../../Infrastructure/constants/messages/walletMessages";
import { ICreateWalletTopupOrderUseCase } from "../../../Application/interfaces/useCase_Interfaces/Wallet/ICreateWalletTopupOrderUseCase";
import { IAgencyWalletController } from "../../Interface/Controllers_Interfaces/Agency_Interfases/IAgencyWalletController";

@injectable()
export class AgencyWalletController implements IAgencyWalletController {
    constructor(
        @inject("IGetWalletOverviewUseCase") private _getWalletOverviewUseCase: IGetWalletOverviewUseCase,
        @inject("ICreateWalletTopupOrderUseCase") private _createWalletTopupOrderUseCase: ICreateWalletTopupOrderUseCase,
    ) { }
    getAgencyWalletOverview = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            const userId = req.user?.id;
            if (!userId) throw new AppError(USER_MESSAGES.USER_ID_MISSING, STATUS.BAD_REQUEST);

            const response = await this._getWalletOverviewUseCase.execute({ ownerId: userId, ownerType: Role.AGENCY })

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
            const order = await this._createWalletTopupOrderUseCase.execute(Role.AGENCY, userId, Number(amount));

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
}