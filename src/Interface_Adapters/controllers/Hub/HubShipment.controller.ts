import { Request, Response, NextFunction } from "express";
import { IGetShipmentsUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/HubShipment/IGetShipmentsUsecase";
import { inject, injectable } from "tsyringe";
import { AppError } from "@/Domain/utils/customError";
import { AUTH_MESSAGES } from "@/Infrastructure/constants/messages/authMessages";
import { GetShipmentsDTO } from "@/Application/Dto/Logistics/shipment.dto";
import { ShipmentStatus, ShipmentType } from "@/Domain/Entities/Logistics/HubShipment";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { ApiResponse } from "@/Interface_Adapters/presenters/ApiResponse";
import { HUB_MESSAGES } from "@/Infrastructure/constants/messages/hubMessage";

@injectable()
export class HubShipmentController {
    constructor(
        @inject("IGetShipmentsUsecase") private _getShipmentsUsecase: IGetShipmentsUsecase,
    ) { }

    getShipments = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const hubId = req.user?.id;
            if (!hubId) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND);

            const dto: GetShipmentsDTO = {
                type: req.query.type?.toString() as ShipmentType,
                status: req.query.status?.toString() as ShipmentStatus,
                workerId: req.query.workerId?.toString() || "",
                search: req.query.search?.toString() || "",
                fromDate: req.query.fromDate?.toString() || "",
                toDate: req.query.toDate?.toString() || "",
                page: Number(req.query.page) || 1,
                limit: Number(req.query.limit) || 10,
            };

            console.log(dto,'ddddddddddddddddddddddddddddd')

            const shipments = await this._getShipmentsUsecase.execute(
                hubId,
                dto
            );

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    HUB_MESSAGES.SHIPMENT_FETCH_SUCCESS,
                    shipments
                )
            );

        } catch (error) {
            next(error)
        }
    }
}