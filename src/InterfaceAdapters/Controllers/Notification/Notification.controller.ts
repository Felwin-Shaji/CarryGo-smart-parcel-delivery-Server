import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IGetNotificationsUseCase } from "../../../Application/Interfaces/UseCases/Notification/IGetNotificationsUseCase";
import { IMarkAsReadUseCase } from "../../../Application/Interfaces/UseCases/Notification/IMarkAsReadUseCase";
import { IMarkAllAsReadUseCase } from "../../../Application/Interfaces/UseCases/Notification/IMarkAllAsReadUseCase";
import { IGetUnreadCountUseCase } from "../../../Application/Interfaces/UseCases/Notification/IGetUnreadCountUseCase";
import { AppError } from "../../../Domain/Utils/customError";
import { AUTH_MESSAGES } from "../../../Infrastructure/Constants/Messages/authMessages";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { NotificationFilter } from "../../../Application/Interfaces/Repositories/Notification/INotificationRepository";
import { ApiResponse } from "../../Presenters/ApiResponse";
import { NOTIFICATION_MESSAGES } from "../../../Infrastructure/Constants/Messages/notificationMessages";

@injectable()
export class NotificationController {
    constructor(
        @inject("IGetNotificationsUseCase") private _getNotificationsUseCase: IGetNotificationsUseCase,

        @inject("IMarkAsReadUseCase") private _markAsReadUseCase: IMarkAsReadUseCase,

        @inject("IMarkAllAsReadUseCase") private _markAllAsReadUseCase: IMarkAllAsReadUseCase,

        @inject("IGetUnreadCountUseCase") private _getUnreadCountUseCase: IGetUnreadCountUseCase
    ) { }

    getNotifications = async (req: Request, res: Response) => {
        const userId = req.user?.id;
        if (!userId)
            throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS.NOT_FOUND);

        const { page = 1, limit = 10, filter = "ALL" } = req.query;

        const result = await this._getNotificationsUseCase.execute(
            userId,
            Number(page),
            Number(limit),
            filter as NotificationFilter
        );

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                NOTIFICATION_MESSAGES.FETCHED,
                result
            )
        );
    };

    getUnreadCount = async (req: Request, res: Response) => {
        const userId = req.user?.id;
        if (!userId)
            throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS.NOT_FOUND);

        const count = await this._getUnreadCountUseCase.execute(userId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                NOTIFICATION_MESSAGES.UNREAD_COUNT,
                { count }
            )
        );
    };

    markAsRead = async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };

        await this._markAsReadUseCase.execute(id);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                NOTIFICATION_MESSAGES.MARK_AS_READ
            )
        );
    };

    markAllAsRead = async (req: Request, res: Response) => {
        const userId = req.user?.id;
        if (!userId)
            throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS.NOT_FOUND);

        await this._markAllAsReadUseCase.execute(userId);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                NOTIFICATION_MESSAGES.MARK_ALL_AS_READ
            )
        );
    };
}