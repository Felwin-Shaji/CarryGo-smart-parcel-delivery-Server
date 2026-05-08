import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { ApiResponse } from "@/Interface_Adapters/presenters/ApiResponse";
import { AppError } from "@/Domain/utils/customError";
import { AUTH_MESSAGES } from "@/Infrastructure/constants/messages/authMessages";
import { IGetNotificationsUseCase } from "@/Application/interfaces/useCase_Interfaces/Notification/IGetNotificationsUseCase";
import { IMarkAsReadUseCase } from "@/Application/interfaces/useCase_Interfaces/Notification/IMarkAsReadUseCase";
import { IMarkAllAsReadUseCase } from "@/Application/interfaces/useCase_Interfaces/Notification/IMarkAllAsReadUseCase";
import { IGetUnreadCountUseCase } from "@/Application/interfaces/useCase_Interfaces/Notification/IGetUnreadCountUseCase";
import { NOTIFICATION_MESSAGES } from "@/Infrastructure/constants/messages/NotificationMessage";
import { NotificationFilter } from "@/Application/interfaces/repositories_interfaces/NotificationRepository_interfaces/INotificationRepository";

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