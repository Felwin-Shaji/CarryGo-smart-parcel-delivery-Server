import { Request, Response, NextFunction } from "express";
import { IGetWorkersShipmentUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/HubShipment/IGetWorkersShipmentUsecase";
import { injectable, inject } from "tsyringe";
import { AppError } from "@/Domain/utils/customError";
import { AUTH_MESSAGES } from "@/Infrastructure/constants/messages/authMessages";
import { GetWorkerShipmentDTO } from "@/Application/Dto/Logistics/shipment.dto";
import { ApiResponse } from "@/Interface_Adapters/presenters/ApiResponse";
import { WORKER_MESSAGES } from "@/Infrastructure/constants/messages/workerMessage";
import { ShipmentStatus, ShipmentType } from "@/Domain/Entities/Logistics/HubShipment";
import { IGetWorkerShipmentDetailsUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IGetWorkerShipmentDetailsUsecase";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { IGetBookingUsecase } from "@/Application/interfaces/useCase_Interfaces/user/Booking/IGetBookingUsecase";
import { BOOKING_MESSAGE } from "@/Infrastructure/constants/messages/bookingMessages";
import { IUpdateShipmentStatusUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IUpdateShipmentStatusUsecase";
import { IBulkUpdateShipmentParcelUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IBulkUpdateShipmentParcelUsecase";
import { ShipmentParcelStatus } from "@/Domain/Entities/Logistics/ShipmentParcel";

@injectable()
export class WorkerShipmentController {
    constructor(
        @inject("IGetWorkersShipmentUsecase") private _getWorkersShipmentUsecase: IGetWorkersShipmentUsecase,
        @inject("IGetWorkerShipmentDetailsUsecase") private _getWorkerShipmentDetailsUsecase: IGetWorkerShipmentDetailsUsecase,
        @inject("IGetBookingUsecase") private _getBookingUsecase: IGetBookingUsecase,
        @inject("IUpdateShipmentStatusUsecase") private _updateShipmentStatusUsecase: IUpdateShipmentStatusUsecase,
        @inject("IBulkUpdateShipmentParcelUsecase") private _bulkUpdateShipmentParcelUsecase: IBulkUpdateShipmentParcelUsecase

    ) { }

    getWorkerShipments = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const workerId = req.user?.id;
            if (!workerId) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS.NOT_FOUND);

            const dto: GetWorkerShipmentDTO = {
                type: req.query.type?.toString() as ShipmentType,
                status: req.query.status?.toString() as ShipmentStatus,
                search: req.query.search?.toString() || "",
                fromDate: req.query.fromDate?.toString() || "",
                toDate: req.query.toDate?.toString() || "",
                page: Number(req.query.page) || 1,
                limit: Number(req.query.limit) || 10,
            }

            const shipments = await this._getWorkersShipmentUsecase.execute(workerId, dto);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    WORKER_MESSAGES.WORKER_SHIPMENTS_FETCH_SUCCESS,
                    shipments
                )
            )
        } catch (error) {
            next(error)
        }
    }

    getWorkerShipmentDetails = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const workerId = req.user?.id;
            if (!workerId) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS.NOT_FOUND);

            const shipmentId = req.params.id;
            if (!shipmentId) throw new AppError(WORKER_MESSAGES.SHIPMENT_NOT_FOUND, STATUS.NOT_FOUND);

            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const shipmentDetails = await this._getWorkerShipmentDetailsUsecase.execute(shipmentId, page, limit);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    WORKER_MESSAGES.SHIPMENT_DETAILS_FETCH_SUCCESS,
                    shipmentDetails
                )
            )
        } catch (error) {
            next(error)
        }
    }

    getBookingDetails = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const bookingId = req.params.id;
            if (!bookingId) throw new AppError(BOOKING_MESSAGE.NOT_FOUND, STATUS.BAD_REQUEST);

            const booking = await this._getBookingUsecase.execute(bookingId);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    BOOKING_MESSAGE.FOUND,
                    booking
                )
            )

        } catch (error) {
            next(error)
        }
    }

    bulkUpdateParcels = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            const { id: shipmentId } = req.params;
            if (!shipmentId) throw new AppError(WORKER_MESSAGES.SHIPMENT_NOT_FOUND, STATUS.NOT_FOUND);

            const { parcelIds, status } = req.body as { parcelIds: string[]; status: ShipmentParcelStatus };


            await this._bulkUpdateShipmentParcelUsecase.execute(shipmentId, parcelIds, status);

            res.status(STATUS.OK).json(
                ApiResponse.success(
                    WORKER_MESSAGES.PARCELS_STATUS_UPDATED
                )
            )

        } catch (error) {
            next(error)
        }
    }

    updateShipmentStatus = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const shipmentId = req.params.id;
            if (!shipmentId) throw new AppError(WORKER_MESSAGES.SHIPMENT_NOT_FOUND, STATUS.NOT_FOUND);

            const { status } = req.body as { status: ShipmentStatus };

            await this._updateShipmentStatusUsecase.execute(shipmentId, status);

            return res.status(STATUS.OK).json(
                ApiResponse.success(
                    WORKER_MESSAGES.SHIPMENT_STATUS_UPDATED,
                )
            )

        } catch (error) {
            next(error)
        }
    }
}