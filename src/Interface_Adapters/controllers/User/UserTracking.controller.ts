import { Request, Response, NextFunction } from "express";
import { IGetTrackingUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/IGetTrackingUsecase";
import { injectable, inject } from "tsyringe";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { ApiResponse } from "@/Interface_Adapters/presenters/ApiResponse";
import { BOOKING_MESSAGE } from "@/Infrastructure/constants/messages/bookingMessages";
import { Role } from "@/Infrastructure/Types/types";

@injectable()
export class UserTrackingController {
    constructor(
        @inject("IGetTrackingUsecase") private _getTrackingUsecase: IGetTrackingUsecase
    ) { }

    getTrackingInfo = async (
        req: Request<{ trackingId: string }>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const trackingId = req.params.trackingId;
            const role = req.user?.role as Role;
            const userId = req.user?.id as string;

            const trackingInfo = await this._getTrackingUsecase.execute(trackingId, role, userId);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    BOOKING_MESSAGE.TRACKING_INFO_FETCHED,
                    trackingInfo
                )
            )

        } catch (error) {
            next(error);
        }
    }
}