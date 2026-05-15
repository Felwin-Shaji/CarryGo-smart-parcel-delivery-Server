import { WorkerShipmentDetails } from "../../../Dto/Logistics/shipment.dto";
import { IHubShipmentRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IShipmentParcelRepository } from "../../../interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { IBookingRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { IGetWorkerShipmentDetailsUsecase } from "../../../interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IGetWorkerShipmentDetailsUsecase";
import { AppError } from "../../../../Domain/utils/customError";
import { SHIPMENT_PARCEL_MESSAGE } from "../../../../Infrastructure/constants/messages/RouteGroupMessage";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { inject, injectable } from "tsyringe";
import { WORKER_MESSAGES } from "../../../../Infrastructure/constants/messages/workerMessage";


@injectable()
export class GetWorkerShipmentDetailsUsecase implements IGetWorkerShipmentDetailsUsecase {
    constructor(
        @inject("IHubShipmentRepository") private _shipmentRepo: IHubShipmentRepository,
        @inject("IShipmentParcelRepository") private _shipmentParcelRepository: IShipmentParcelRepository,
        @inject("IBookingRepository") private _bookingRepo: IBookingRepository,
        @inject("IUserRepository") private _userRepo: IUserRepository,


    ) { }

    async execute(shipmentId: string, page: number, limit: number): Promise<WorkerShipmentDetails> {
        const shipment = await this._shipmentRepo.findById({ _id: shipmentId });
        if (!shipment) throw new AppError(WORKER_MESSAGES.SHIPMENT_NOT_FOUND, STATUS.NOT_FOUND);

        const { parcels, total } = await this._shipmentParcelRepository.findByShipmentIdPaginated(
            shipmentId,
            page,
            limit
        );

        const bookingIds = [...new Set(parcels.map(p => p.bookingId))];
        const bookings = await this._bookingRepo.findByIds(bookingIds);

        const bookingMap = new Map(
            bookings.map(b => [b.id, b])
        );

        const userIds = [...new Set(
            bookings.map(b => b.userId).filter(Boolean)
        )];

        const users = await this._userRepo.findByIds(userIds);

        const userMap = new Map(
            users.map(u => [u.id, u])
        );

        const parcelDTOs = parcels.map(p => {
            const booking = bookingMap.get(p.bookingId);
            const user = booking?.userId ? userMap.get(booking.userId) : null;

            if (!p.id || !booking?.id || !booking?.bookingId) {
                throw new AppError(
                    SHIPMENT_PARCEL_MESSAGE.IDs_MISSING,
                    STATUS.NOT_FOUND
                );
            }

            return {
                id: p.id,
                bookingId: booking?.id,
                bookingTrackId: booking?.bookingId,
                customerName: user?.name || "Unknown Customer",
                address: booking?.deliveryAddress?.formattedAddress || "—",
                status: p.status,
                loadedAt: p.loadedAt.toISOString(),
                unloadedAt: p.unloadedAt ? p.unloadedAt.toISOString() : null,
            };
        });

        return {
            id: shipment.id!,
            type: shipment.type,
            status: shipment.status,
            parcelCount: total,
            capacity: shipment.capacity,
            createdAt: shipment.createdAt.toString(),
            parcels: parcelDTOs,
        };

    }
}