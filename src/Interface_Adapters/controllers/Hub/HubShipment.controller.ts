import { Request, Response } from "express";
// import { IGetShipmentsUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/HubShipment/IGetShipmentsUsecase";
import { inject, injectable } from "tsyringe";
import { IGetShipmentsUsecase } from "../../../Application/interfaces/useCase_Interfaces/Logistics/HubShipment/IGetShipmentsUsecase";
import { IGetShipmentDetailsUsecase } from "../../../Application/interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IGetShipmentDetailsUsecase";
import { IUpdateHubShipmentUsecase } from "../../../Application/interfaces/useCase_Interfaces/Logistics/HubShipment/IUpdateHubShipmentUsecase";
import { GetShipmentsDTO, UpdateHubShipmentDTO } from "../../../Application/Dto/Logistics/shipment.dto";
import { ShipmentStatus, ShipmentType } from "../../../Domain/Entities/Logistics/HubShipment";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ApiResponse } from "../../presenters/ApiResponse";
import { HUB_MESSAGES } from "../../../Infrastructure/constants/messages/hubMessage";
import { AppError } from "../../../Domain/utils/customError";
import { AUTH_MESSAGES } from "../../../Infrastructure/constants/messages/authMessages";
// import { AppError } from "@/Domain/utils/customError";
// import { AUTH_MESSAGES } from "@/Infrastructure/constants/messages/authMessages";
// import { GetShipmentsDTO, UpdateHubShipmentDTO } from "@/Application/Dto/Logistics/shipment.dto";
// import { ShipmentStatus, ShipmentType } from "@/Domain/Entities/Logistics/HubShipment";
// import { STATUS } from "@/Infrastructure/constants/statusCodes";
// import { ApiResponse } from "@/Interface_Adapters/presenters/ApiResponse";
// import { HUB_MESSAGES } from "@/Infrastructure/constants/messages/hubMessage";
// import { IGetShipmentDetailsUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IGetShipmentDetailsUsecase";
// import { IUpdateHubShipmentUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/HubShipment/IUpdateHubShipmentUsecase";

@injectable()
export class HubShipmentController {
    constructor(
        @inject("IGetShipmentsUsecase") private _getShipmentsUsecase: IGetShipmentsUsecase,
        @inject("IGetShipmentDetailsUsecase") private _getShipmentDetailsUsecase: IGetShipmentDetailsUsecase,
        @inject("IUpdateHubShipmentUsecase") private _updateHubShipmentUsecase: IUpdateHubShipmentUsecase
    ) { }

    getShipmentById = async (req: Request, res: Response): Promise<Response | void> => {
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

        const shipments = await this._getShipmentsUsecase.execute(
            hubId,
            dto
        );

        console.log(shipments, 'shipmentsshipmentsshipments')

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                HUB_MESSAGES.SHIPMENT_FETCH_SUCCESS,
                shipments
            )
        );
    }

    getShipmentDetails = async (req: Request, res: Response): Promise<Response | void> => {
        const shipmentId = req.params.id;
        if (!shipmentId) throw new AppError(HUB_MESSAGES.LOGIDTICS_ID_MISSING)

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const shipmentParcel = await this._getShipmentDetailsUsecase.execute(
            shipmentId,
            page,
            limit
        );

        console.log(shipmentParcel, 'shipmentParcelshipmentParcelshipmentParcel')

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                HUB_MESSAGES.SHIPMENT_PARCEL_FETCH_SUCCESS,
                shipmentParcel
            )
        );
    }

    updateShipmentDetails = async (req: Request, res: Response): Promise<Response | void> => {
        const shipmentId = req.params.id;
        if (!shipmentId) throw new AppError(HUB_MESSAGES.LOGIDTICS_ID_MISSING)

        const dto = req.body as UpdateHubShipmentDTO

        await this._updateHubShipmentUsecase.execute(shipmentId, dto);

        return res.status(STATUS.OK).json(
            ApiResponse.success(
                HUB_MESSAGES.SHIPMENT_DETAILS_UPDATED,
            )
        );
    }
}