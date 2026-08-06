import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { IGetTrackingUsecase } from "../../../Application/Interfaces/UseCases/Logistics/Tracking/IGetTrackingUseCase";
import { Role } from "../../../Infrastructure/Types/CommonTypes";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { ApiResponse } from "../../Presenters/ApiResponse";
import { BOOKING_MESSAGE } from "../../../Infrastructure/Constants/Messages/bookingMessages";

@injectable()
export class UserTrackingController {
    constructor(
        @inject("IGetTrackingUsecase") private _getTrackingUsecase: IGetTrackingUsecase
    ) { }

    getTrackingInfo = async (
        req: Request<{ trackingId: string }>,
        res: Response,
    ): Promise<Response | void> => {
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

    }
}