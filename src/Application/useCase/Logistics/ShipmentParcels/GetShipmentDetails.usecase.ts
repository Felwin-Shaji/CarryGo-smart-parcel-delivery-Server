import { ShipmentParcelsPaginatedDTO } from "@/Application/Dto/Logistics/shipment.dto";
import { IHubRepository } from "@/Application/interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { IHubShipmentRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { IShipmentParcelRepository } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IShipmentParcelRepository";
import { IBookingRepository } from "@/Application/interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { IUserRepository } from "@/Application/interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { IHubWorkerRepository } from "@/Application/interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { IGetShipmentDetailsUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/ShipmentParcel/IGetShipmentDetailsUsecase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetShipmentDetailsUsecase implements IGetShipmentDetailsUsecase {
    constructor(
        @inject("IHubShipmentRepository") private _shipmentRepo: IHubShipmentRepository,
        @inject("IShipmentParcelRepository") private _shipmentParcelRepository: IShipmentParcelRepository,

        @inject("IBookingRepository") private _bookingRepo: IBookingRepository,
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IHubWorkerRepository") private _workerRepo: IHubWorkerRepository,
        @inject("IHubRepository") private _hubRepo: IHubRepository
    ) { }

    async execute(
        shipmentId: string,
        page: number,
        limit: number
    ): Promise<ShipmentParcelsPaginatedDTO> {

        const shipment = await this._shipmentRepo.findById({ _id: shipmentId });
        if (!shipment) throw new Error("Shipment not found");


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
            const user = booking?.userId
                ? userMap.get(booking.userId)
                : null;

            return {
                id: p.id!,
                bookingTrackId: booking?.bookingId!,
                bookingId: booking?.id!,
                customerName: user?.name || "Unknown Customer",
                address: booking?.deliveryAddress?.formattedAddress || "—",
                status: p.status,
                loadedAt: p.loadedAt.toISOString(),
                unloadedAt: p.unloadedAt ? p.unloadedAt.toISOString() : null,
            };
        });

        let assignedWorker;
        if (shipment.assignedWorkerId) {
            const worker = await this._workerRepo.findById({ _id: shipment.assignedWorkerId });

            if (worker) {
                assignedWorker = {
                    id: worker.id!,
                    name: worker.name,
                    ...(worker.mobile && { mobile: worker.mobile }),
                };
            }
        }

        // 7 Hubs
        const [fromHub, toHub] = await Promise.all([
            shipment.fromHubId
                ? this._hubRepo.findById({ _id: shipment.fromHubId })
                : null,
            shipment.toHubId
                ? this._hubRepo.findById({ _id: shipment.toHubId })
                : null,
        ]);


        return {
            shipmentDetails: {
                id: shipment.id!,
                type: shipment.type,
                status: shipment.status,


                ...(fromHub?.name && { fromHubName: fromHub.name }),
                ...(toHub?.name && { toHubName: toHub.name }),


                ...(assignedWorker && { assignedWorker }),

                capacity: shipment.capacity,
                parcelCount: shipment.parcelCount,

                estimatedDispatchAt: shipment.estimatedDispatchAt,

                parcels: parcelDTOs,

                createdAt: shipment.createdAt,
            },

            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}