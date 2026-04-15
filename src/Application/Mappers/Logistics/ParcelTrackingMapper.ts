import { ParcelTrackingDTO, HubDTO } from "@/Application/Dto/Logistics/ParcelTracking.dto";
import { AddressEntity, Booking } from "@/Domain/Entities/Booking/Booking";
import { ParcelMovement } from "@/Domain/Entities/Booking/ParcelMovement";
import { ParcelRouteLeg } from "@/Domain/Entities/Logistics/ParcelRouteLeg";
import { HubShipment } from "@/Domain/Entities/Logistics/HubShipment";
import { RouteSegment } from "@/Domain/Entities/Logistics/RouteSegment";
import { Hub } from "@/Domain/Entities/Hub/Hub";
import { AppError } from "@/Domain/utils/customError";

export class ParcelTrackingMapper {

    // 🔥 MAIN METHOD
    static toDTO(
        booking: Booking,
        legs: ParcelRouteLeg[],
        movements: ParcelMovement[],
        segments: Map<string, RouteSegment>,
        hubs: Map<string, Hub>,
        shipments: HubShipment[]
    ): ParcelTrackingDTO {

        const sortedMovements = [...movements].sort(
            (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
        );

        const latest = sortedMovements[sortedMovements.length - 1];

        return {
            booking: this.mapBooking(booking),
            currentStatus: this.mapCurrentStatus(latest, hubs),
            route: {
                legs: this.mapRouteLegs(legs, segments, hubs)
            },
            timeline: this.buildTimeline(booking, legs, movements, hubs, segments, shipments),
            shipment: this.mapShipment(shipments)
        };
    }

    //  Booking
    private static mapBooking(booking: Booking) {
        return {
            bookingId: booking.bookingId,
            status: booking.status,
            from: {
                label: booking.pickupAddress.label,
                formattedAddress: booking.pickupAddress.formattedAddress,
                city: booking.pickupAddress.city,
                state: booking.pickupAddress.state,
                country: booking.pickupAddress.country,
                pincode: booking.pickupAddress.pincode,
                location: booking.pickupAddress.location
            },
            to: {
                label: booking.deliveryAddress.label,
                formattedAddress: booking.deliveryAddress.formattedAddress,
                city: booking.deliveryAddress.city,
                state: booking.deliveryAddress.state,
                country: booking.deliveryAddress.country,
                pincode: booking.deliveryAddress.pincode,
                location: booking.deliveryAddress.location
            },
            createdAt: booking.createdAt
        };
    }

    // Current Status
    private static mapCurrentStatus(
        movement: ParcelMovement | undefined,
        hubs: Map<string, Hub>
    ) {
        if (!movement) {
            return {
                status: "PENDING",
                hub: null,
                message: "Awaiting pickup",
                updatedAt: null
            };
        }

        const hub = this.resolveHub(movement, hubs);

        return {
            status: movement.status,
            hub,
            message: this.buildMessage(movement, hubs),
            updatedAt: movement.updatedAt
        };
    }

    //  Route Legs
    private static mapRouteLegs(
        legs: ParcelRouteLeg[],
        segments: Map<string, RouteSegment>,
        hubs: Map<string, Hub>
    ) {
        return legs.map(l => {
            const segment = segments.get(l.segmentId);

            if (!segment) {
                throw new Error(`Segment not found: ${l.segmentId}`);
            }

            console.log(l.status,"satusssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")

            return {
                legOrder: l.legOrder,
                fromHub: this.mapHub(hubs.get(segment.originHubId)),
                toHub: this.mapHub(hubs.get(segment.destinationHubId)),
                status: l.status,
                shipmentId: l.shipmentId
            };
        });
    }

    private static buildTimeline(
    booking: Booking,
    legs: ParcelRouteLeg[],
    movements: ParcelMovement[],
    hubs: Map<string, Hub>,
    segments: Map<string, RouteSegment>,
    shipments: HubShipment[]
) {
    const timeline: ParcelTrackingDTO["timeline"] = [];

    // ✅ Sort legs properly
    const sortedLegs = [...legs].sort((a, b) => a.legOrder - b.legOrder);

    // ✅ Helper: safe hub mapping
    const getHub = (hubId?: string | null) => {
        if (!hubId) return null;
        const hub = hubs.get(hubId);
        return hub ? this.mapHub(hub) : null;
    };

    // =====================================================
    // 1. CONFIRMED
    // =====================================================
    timeline.push({
        status: "CONFIRMED",
        fromHub: null,
        toHub: null,
        message: "Booking confirmed. Pickup scheduled.",
        timestamp: booking.createdAt,
    });

    // =====================================================
    // 2. PICKUP (BULK_PICKUP)
    // =====================================================
    const pickupShipment = shipments
        .filter(s => s.type === "BULK_PICKUP")
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

    timeline.push({
        status: "PICKED_UP",
        fromHub: null,
        toHub: getHub(pickupShipment?.toHubId),
        message: pickupShipment
            ? "Parcel collected and transported to origin hub."
            : "Waiting for pickup from sender.",
        ...(pickupShipment?.arrivedAt && { timestamp: pickupShipment.arrivedAt }),
    });

    // =====================================================
    // 3. LEGS (MAIN LOGIC)
    // =====================================================
    sortedLegs.forEach((leg, index) => {
        const segment = segments.get(leg.segmentId);
        if (!segment) return;

        const fromHub = getHub(segment.originHubId);
        const toHub = getHub(segment.destinationHubId);

        // ✅ PRIORITY 1: SHIPMENT (REAL DATA)
        const shipment = shipments.find(s => s.id === leg.shipmentId);

        if (shipment) {
            switch (shipment.status) {
                case "PENDING":
                    timeline.push({
                        status: "PENDING",
                        fromHub,
                        toHub,
                        message: `Shipment scheduled from ${fromHub?.name} to ${toHub?.name}`,
                        ...(shipment.estimatedDispatchAt && {
                            timestamp: shipment.estimatedDispatchAt,
                        }),
                    });
                    return;

                case "LOADING":
                    timeline.push({
                        status: "LOADING",
                        fromHub,
                        toHub,
                        message: `Parcel is being loaded at ${fromHub?.name}`,
                        ...(shipment.updatedAt && { timestamp: shipment.updatedAt }),
                    });
                    return;

                case "DISPATCHED":
                    timeline.push({
                        status: "IN_TRANSIT",
                        fromHub,
                        toHub,
                        message: `Parcel is in transit from ${fromHub?.name} to ${toHub?.name}`,
                        ...(shipment.departedAt && { timestamp: shipment.departedAt }),
                    });
                    return;

                case "ARRIVED":
                    timeline.push({
                        status: "ARRIVED",
                        fromHub,
                        toHub,
                        message: `Parcel arrived at ${toHub?.name}`,
                        ...(shipment.arrivedAt && { timestamp: shipment.arrivedAt }),
                    });
                    return;

                case "COMPLETED":
                    timeline.push({
                        status: "COMPLETED",
                        fromHub,
                        toHub,
                        message: `Parcel processed at ${toHub?.name}`,
                        ...(shipment.arrivedAt && { timestamp: shipment.arrivedAt }),
                    });
                    return;

                case "CANCELLED":
                    timeline.push({
                        status: "CANCELLED",
                        fromHub,
                        toHub,
                        message: `Shipment cancelled from ${fromHub?.name}`,
                        ...(shipment.updatedAt && { timestamp: shipment.updatedAt }),
                    });
                    return;
            }
        }

        // ✅ PRIORITY 2: MOVEMENTS (ACTUAL SCANS)
        const movement = movements.find(m => m.segmentId === leg.segmentId);

        if (movement) {
            timeline.push({
                status: "IN_TRANSIT",
                fromHub,
                toHub,
                message: `Parcel scanned during transit from ${fromHub?.name} to ${toHub?.name}`,
                ...(movement.updatedAt && { timestamp: movement.updatedAt }),
            });
            return;
        }

        // ✅ PRIORITY 3: LEG (FALLBACK)
        if (leg.status === "COMPLETED") {
            timeline.push({
                status: "COMPLETED",
                fromHub,
                toHub,
                message: `Parcel moved from ${fromHub?.name} to ${toHub?.name}`,
                ...(leg.updatedAt && { timestamp: leg.updatedAt }),
            });
        } else if (leg.status === "IN_PROGRESS") {
            timeline.push({
                status: "IN_TRANSIT",
                fromHub,
                toHub,
                message: `Parcel is moving from ${fromHub?.name} to ${toHub?.name}`,
                ...(leg.updatedAt && { timestamp: leg.updatedAt }),
            });
        } else {
            timeline.push({
                status: "PENDING",
                fromHub,
                toHub,
                message: `Awaiting dispatch from ${fromHub?.name}`,
            });
        }
    });

    // =====================================================
    // 4. LAST MILE DELIVERY
    // =====================================================
    const lastMile = shipments
        .filter(s => s.type === "OUT_FOR_DELIVERY")
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

    if (lastMile) {
        const hub = getHub(lastMile.fromHubId);

        timeline.push({
            status: "OUT_FOR_DELIVERY",
            fromHub: hub,
            toHub: null,
            message: `Out for delivery from ${hub?.name || "delivery hub"}`,
            ...(lastMile.departedAt && { timestamp: lastMile.departedAt }),
        });
    }

    // =====================================================
    // 5. STABLE SORT (IMPORTANT)
    // =====================================================
    timeline.forEach((item, i) => ((item as any)._order = i));

    return timeline.sort((a: any, b: any) => {
        if (a.timestamp && b.timestamp) {
            return b.timestamp.getTime() - a.timestamp.getTime();
        }

        if (a.timestamp) return -1;
        if (b.timestamp) return 1;

        return a._order - b._order;
    });
}

    // Shipment
    private static mapShipment(shipments: HubShipment[]) {

        const activeShipment = shipments.find((s) =>
            ["LOADING", "DISPATCHED"].includes(s.status)
        );
        if (!activeShipment) return null;

        return {
            vehicleNumber: activeShipment.vehicleNumber,
            status: activeShipment.status,
            departedAt: activeShipment.departedAt,
            arrivedAt: activeShipment.arrivedAt
        };
    }

    // Hub Mapper
    private static mapHub(hub?: Hub): HubDTO {
        if (!hub) {
            throw new AppError("Hub not found while mapping route");
        }

        return {
            id: hub.id!,
            name: hub.name,
            address: hub.address,
            coordinates: hub.location
        };
    }

    // Resolve Hub
    private static resolveHub(
        movement: ParcelMovement,
        hubs: Map<string, Hub>
    ): HubDTO | null {
        if (movement.toHubId) return this.mapHub(hubs.get(movement.toHubId));
        if (movement.fromHubId) return this.mapHub(hubs.get(movement.fromHubId));
        return null;
    }

    // Message Builder (UX layer)
    private static buildMessage(
        m: ParcelMovement,
        hubs: Map<string, Hub>
    ): string {
        const from = m.fromHubId ? hubs.get(m.fromHubId)?.name : "";
        const to = m.toHubId ? hubs.get(m.toHubId)?.name : "";

        switch (m.status) {
            case "PENDING":
                return "Awaiting processing";
            case "LOADED":
                return `Parcel loaded at ${from}`;
            case "IN_TRANSIT":
                return `In transit from ${from} to ${to}`;
            case "ARRIVED":
                return `Arrived at ${to}`;
            case "OUT_FOR_DELIVERY":
                return "Out for delivery";
            case "DELIVERED":
                return "Delivered successfully";
            default:
                return m.status;
        }
    }
}