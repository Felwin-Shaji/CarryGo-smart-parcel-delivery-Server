// Application/Mappers/Logistics/HubShipmentMapper.ts
import { GetShipmentsResponseDTO } from "@/Application/Dto/Logistics/shipment.dto";
import { HubShipmentPaginatedData } from "@/Application/interfaces/repositories_interfaces/LogisticRepositories_Interfaces/IHubShipmentRepository";
import { Booking } from "@/Domain/Entities/Booking/Booking";
import { HubShipment, ShipmentStatus } from "@/Domain/Entities/Logistics/HubShipment";
import { RouteSegment } from "@/Domain/Entities/Logistics/RouteSegment";

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

        const dispatchDate = new Date();
        dispatchDate.setDate(dispatchDate.getDate() + 1); // Add 1 days
        dispatchDate.setHours(9, 0, 0, 0); // Set time to 9:00 AM

        return new HubShipment(
            null,
            null,
            "BULK_PICKUP",
            null,
            booking.logistics?.fromHubId!,
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
    }

    static toGetPaginatedHubShipmentsResponse(dto: HubShipmentPaginatedData): GetShipmentsResponseDTO {
        return {
            shipments: dto.data.map(s => ({
                id: s.id!,
                type: s.type,
                status: s.status,

                segmentId: s.segmentId,

                fromHubId: s.fromHubId,
                toHubId: s.toHubId,

                assignedWorkerId: s.assignedWorkerId,
                assignedWorkerName: (s as any).assignedWorkerName ?? null, // ⚠️ see below

                vehicleNumber: s.vehicleNumber,

                capacity: s.capacity,
                parcelCount: s.parcelCount,

                estimatedDispatchAt: s.estimatedDispatchAt,
                departedAt: s.departedAt,
                arrivedAt: s.arrivedAt,

                createdAt: s.createdAt,
            })),

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