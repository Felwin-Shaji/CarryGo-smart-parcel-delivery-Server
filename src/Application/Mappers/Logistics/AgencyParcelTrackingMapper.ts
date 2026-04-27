import { AgencyParcelTrackingDTO, HubDTO } from "@/Application/Dto/Logistics/ParcelTracking.dto";
import { Booking } from "@/Domain/Entities/Booking/Booking";
import { ParcelMovement } from "@/Domain/Entities/Booking/ParcelMovement";
import { ParcelRouteLeg } from "@/Domain/Entities/Logistics/ParcelRouteLeg";
import { HubShipment } from "@/Domain/Entities/Logistics/HubShipment";
import { RouteSegment } from "@/Domain/Entities/Logistics/RouteSegment";
import { Hub } from "@/Domain/Entities/Hub/Hub";
import { AppError } from "@/Domain/utils/customError";

export class AgencyParcelTrackingMapper {

  // 🔥 MAIN METHOD
  static toDTO(
    booking: Booking,
    legs: ParcelRouteLeg[],
    movements: ParcelMovement[],
    segments: Map<string, RouteSegment>,
    hubs: Map<string, Hub>,
    shipments: HubShipment[]
  ): AgencyParcelTrackingDTO {

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

      console.log(l.status, "satusssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")

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
    const timeline: AgencyParcelTrackingDTO["timeline"] = [];

    const getHub = (id?: string | null) =>
      id ? this.mapHub(hubs.get(id)) : null;

    // 🔹 Booking created
    timeline.push({
      status: "CONFIRMED",
      fromHub: null,
      toHub: null,
      message: "Booking created",
      timestamp: booking.createdAt
    });

    // 🔹 Shipment events
    shipments.forEach(s => {
      const fromHub = getHub(s.fromHubId);
      const toHub = getHub(s.toHubId);

      if (s.status === "LOADING") {
        timeline.push({
          status: "LOADING",
          fromHub,
          toHub,
          message: `Loading started at ${fromHub?.name}`,
          timestamp: s.updatedAt
        });
      }

      if (s.status === "DISPATCHED") {
        timeline.push({
          status: "IN_TRANSIT",
          fromHub,
          toHub,
          message: `Departed from ${fromHub?.name}`,
          timestamp: s.departedAt!
        });
      }

      if (s.status === "ARRIVED") {
        timeline.push({
          status: "ARRIVED",
          fromHub,
          toHub,
          message: `Arrived at ${toHub?.name}`,
          timestamp: s.arrivedAt!
        });
      }
    });

    // 🔹 Movement logs (if available)
    movements.forEach(m => {
      timeline.push({
        status: m.status,
        fromHub: getHub(m.fromHubId),
        toHub: getHub(m.toHubId),
        message: this.buildMessage(m, hubs),
        timestamp: m.createdAt
      });
    });

    // 🔹 Sort ASC (log style)
    timeline.sort(
      (a, b) =>
        (a.timestamp?.getTime() || 0) -
        (b.timestamp?.getTime() || 0)
    );

    return timeline;
  }

  // Shipment
  private static mapShipment(shipments: HubShipment[]) {

    const activeShipment = shipments.find((s) =>
      ["LOADING", "DISPATCHED", "ARRIVED", "COMPLETED"].includes(s.status)
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
    const from = m.fromHubId ? hubs.get(m.fromHubId)?.name : null;
    const to = m.toHubId ? hubs.get(m.toHubId)?.name : null;

    console.log('////////////////////////////////');
    console.log(m.status)
    console.log('///////////////////////////////////')

    switch (m.status) {

      case "PENDING":
        return "Parcel is registered and awaiting processing at the origin facility.";

      case "LOADED":
        return from
          ? `Parcel has been loaded onto the vehicle at ${from}.`
          : "Parcel has been loaded onto the vehicle.";

      case "IN_TRANSIT":
        if (from && to) {
          return `Parcel is in transit from ${from} to ${to}.`;
        }
        if (from) {
          return `Parcel is in transit from ${from}.`;
        }
        return "Parcel is currently in transit.";

      case "ARRIVED":
        return to
          ? `Parcel has arrived at ${to} and is being processed.`
          : "Parcel has arrived at the facility.";

      case "OUT_FOR_DELIVERY":
        return "Parcel is out for delivery and will reach the destination soon.";

      case "DELIVERED":
        return "Parcel has been successfully delivered to the recipient.";

      default:
        return `Status updated: ${m.status}`;
    }
  }
}