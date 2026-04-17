import { GetShipmentsResponseDTO, HubShipmentWithWorker } from "@/Application/Dto/Logistics/shipment.dto";
import { HubShipmentPaginatedData } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { Booking } from "@/Domain/Entities/Booking/Booking";
import { HubShipment, ShipmentStatus } from "@/Domain/Entities/Logistics/HubShipment";
import { RouteSegment } from "@/Domain/Entities/Logistics/RouteSegment";
import { AppError } from "@/Domain/utils/customError";
import { HUB_SHIPMENT_MESSAGE } from "@/Infrastructure/constants/messages/RouteGroupMessage";
import { STATUS } from "@/Infrastructure/constants/statusCodes";

export class HubShipmentMapper {

    static toCreate(segment: RouteSegment): HubShipment {
        const dispatchDate = new Date();
        dispatchDate.setDate(dispatchDate.getDate() + 1); // Add 2 days
        dispatchDate.setHours(9, 0, 0, 0); // Set time to 9:00 AM
        return new HubShipment(
            null,
            segment.id,
            "HUB_TRANSFER",
            segment.originHubId,
            segment.destinationHubId,
            null,
            null,
            50, //capicity need to change to constents,
            1,
            "PENDING",
            dispatchDate,
            null,
            null,
            new Date(),
            new Date(),
        );
    }

    static toCreatePickup(booking: Booking): HubShipment {

        if (!booking.logistics?.fromHubId) {
            throw new AppError(HUB_SHIPMENT_MESSAGE.FROM_HUB_ID_NOT_FOUND, STATUS.NOT_FOUND);
        }

        const dispatchDate = new Date();
        dispatchDate.setDate(dispatchDate.getDate() + 1); // Add 1 days
        dispatchDate.setHours(9, 0, 0, 0); // Set time to 9:00 AM

        return new HubShipment(
            null,
            null,
            "BULK_PICKUP",
            null,
            booking.logistics?.fromHubId,
            null,
            null,
            20, //capicity need to change to constents,
            1,
            "PENDING",
            dispatchDate,
            null,
            null,
            new Date(),
            new Date()
        )
    };

    static toCreateDelivery(booking: Booking): HubShipment {

        const dispatchDate = new Date();
        dispatchDate.setDate(dispatchDate.getDate() + 1); // Add 1 days
        dispatchDate.setHours(9, 0, 0, 0); // Set time to 9:00 AM

        if (!booking.logistics?.toHubId) {
            throw new AppError(HUB_SHIPMENT_MESSAGE.TO_HUB_ID_NOT_FOUND, STATUS.NOT_FOUND);
        }

        return new HubShipment(
            null,
            null,
            "OUT_FOR_DELIVERY",
            booking.logistics?.toHubId,
            null,
            null,
            null,
            20,
            1,
            "PENDING",
            dispatchDate,
            null,
            null,
            new Date(),
            new Date(),
        )

    }

    static toGetPaginatedHubShipmentsResponse(dto: HubShipmentPaginatedData): GetShipmentsResponseDTO {
        return {
            shipments: dto.data.map(s => {
                const shipment = s as HubShipmentWithWorker;

                return {
                    id: shipment.id!,
                    type: shipment.type,
                    status: shipment.status,
                    segmentId: shipment.segmentId,
                    fromHubId: shipment.fromHubId,
                    toHubId: shipment.toHubId,
                    assignedWorkerId: shipment.assignedWorkerId,
                    assignedWorkerName: shipment.assignedWorkerName ?? null,
                    vehicleNumber: shipment.vehicleNumber,
                    capacity: shipment.capacity,
                    parcelCount: shipment.parcelCount,
                    estimatedDispatchAt: shipment.estimatedDispatchAt,
                    departedAt: shipment.departedAt,
                    arrivedAt: shipment.arrivedAt,
                    createdAt: shipment.createdAt,
                };
            }),

            pagination: {
                total: dto.total,
                page: dto.page,
                limit: dto.limit,
                totalPages: dto.totalPages,
            }
        };
    }

    static updateStatus(
        shipment: HubShipment,
        status: ShipmentStatus,
        now: Date
    ): HubShipment {
        console.log(status, "status in mapper")
        shipment.status = status;

        if (status === "DISPATCHED") {
            shipment.departedAt = now;
        }

        if (status === "ARRIVED") {
            shipment.arrivedAt = now;
        }

        shipment.updatedAt = now;

        return shipment;
    }
}