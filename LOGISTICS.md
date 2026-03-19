# CarryGo — Logistics Domain

> This document is the **single source of truth** for any developer
> working on the logistics domain. Read this before touching any file
> inside `src/Domain/Entities/Logistics/`.

---

## What is this system?

CarryGo uses a **Hub-and-Spoke Linehaul Network** to move parcels
between cities. Parcels do not travel directly from sender to recipient.
Instead they flow through a network of hubs, carried by trucks that
run fixed corridors between them.

This is the same model used by FedEx, DHL, and most major couriers.

---

## The big picture

```
SENDER
  │
  │  [BULK_PICKUP shipment]
  ▼
ORIGIN HUB  ──────────────────────────────────────────────────────┐
  │                                                                │
  │  [HUB_TRANSFER shipment]                                       │
  │  Truck runs RouteSegment 1                                     │
  ▼                                                                │
MID HUB (optional, if parcel crosses corridors)                   │
  │                                                                │
  │  [HUB_TRANSFER shipment]                                       │
  │  Truck runs RouteSegment 2                                     │
  ▼                                                                │
DESTINATION HUB ◄─────────────────────────────────────────────────┘
  │
  │  [OUT_FOR_DELIVERY shipment]
  ▼
RECIPIENT
```

---

## Entities and their roles

### 1. RouteGroup
**File:** `RouteGroup.ts`

A named truck corridor operated by an agency.
Think of it like a bus route — it has a name and a fixed sequence of stops.
The RouteGroup itself holds no geographic data. The actual hub stops
are defined by its child RouteSegments.

```
RouteGroup: "Mumbai–Delhi Express"
  └── RouteSegment 1: Mumbai  → Nagpur   (order: 1, ~420km)
  └── RouteSegment 2: Nagpur  → Delhi    (order: 2, ~520km)
```

**Key fields:**
- `agencyId` — which agency operates this corridor
- `isActive` — inactive corridors are excluded from route planning

---

### 2. RouteSegment
**File:** `RouteSegment.ts`

One hub-to-hub hop inside a RouteGroup corridor.
This is the building block of the entire network.

```
RouteSegment {
  routeGroupId:        "rg_mumbai_delhi"
  originHubId:         "hub_mumbai"
  destinationHubId:    "hub_nagpur"
  segmentOrder:        1
  distanceKm:          420
  estimatedTimeMinutes: 480
}
```

**Important distinction:**
- `segmentOrder` = position of this hop within its RouteGroup corridor
- `ParcelRouteLeg.legOrder` = position of this hop in a specific parcel's journey

These are two different things. A segment can be order 2 in its corridor
but leg order 1 in a parcel's journey if the parcel boards mid-corridor.

**Validations:**
- `segmentOrder` must be > 0
- `originHubId` and `destinationHubId` cannot be the same hub

---

### 3. ParcelRoute
**File:** `ParcelRoute.ts`

The computed plan for one parcel's journey through the hub network.
Created when a hub-logistics booking is confirmed.

One `Booking` → One `ParcelRoute` → Many `ParcelRouteLeg`s

```
ParcelRoute {
  bookingId: "bk_abc123"
  status:    "PLANNED"
}
```

**Status lifecycle:**
```
PLANNED → IN_PROGRESS → COMPLETED
                      ↘ FAILED
```

---

### 4. ParcelRouteLeg
**File:** `ParcelRouteLeg.ts`

One planned hop in a parcel's journey. Links a `RouteSegment`
to the parcel's route plan with an explicit ordering.

This is what makes cross-corridor routing possible.
A parcel going Mumbai → Chandigarh might cross two separate
RouteGroups — the legs stitch them together.

**Real-world scenario — parcel: Mumbai → Chandigarh**

```
RouteGroup 1: "Mumbai–Delhi Express"
  Segment A: Mumbai → Nagpur   (order 1)
  Segment B: Nagpur → Delhi    (order 2)

RouteGroup 2: "Delhi–North Express"
  Segment C: Delhi → Chandigarh (order 1)

ParcelRoute for this booking:
  ParcelRouteLeg 1 → Segment A  (legOrder: 1)  boards in Mumbai
  ParcelRouteLeg 2 → Segment B  (legOrder: 2)  stays on truck
  ParcelRouteLeg 3 → Segment C  (legOrder: 3)  transfers at Delhi
```

**Key fields:**
- `segmentId` — which RouteSegment this leg runs on
- `legOrder` — position in THIS parcel's journey (not the corridor order)
- `shipmentId` — null until a HubShipment (truck) is assigned to this leg
- `status` — PENDING until the leg starts executing

**Status lifecycle:**
```
PENDING → IN_PROGRESS → COMPLETED
                      ↘ SKIPPED  (hub bypassed or rerouted)
```

---

### 5. HubShipment
**File:** `HubShipment.ts`

One physical vehicle dispatch. A truck, van, or any vehicle
that carries parcels from one point to another.

Many parcels travel together on one shipment.

**Three types of shipment:**

| Type | Description | segmentId |
|---|---|---|
| `HUB_TRANSFER` | Linehaul truck between two hubs | Required |
| `BULK_PICKUP` | Collection van from senders to origin hub | Null |
| `OUT_FOR_DELIVERY` | Last-mile van from hub to recipient | Null |

**Status lifecycle:**
```
PENDING → LOADING → DISPATCHED → ARRIVED → COMPLETED
        ↘ CANCELLED (before DISPATCHED only)
```

**What happens at each status:**
- `LOADING` — hub staff are scanning parcels onto this vehicle
- `DISPATCHED` — vehicle has left, `departedAt` is set
- `ARRIVED` — vehicle reached destination, `arrivedAt` is set
- `COMPLETED` — all parcels unloaded and confirmed

---

### 6. ShipmentParcel
**File:** `ShipmentParcel.ts`

The manifest entry. Records that a specific parcel (booking)
is loaded onto a specific shipment.

This is the **shipment-centric view** — answers the question:
*"What parcels are on this truck right now?"*

Compare with `ParcelMovement` which is the **parcel-centric view** —
*"Where has this parcel been?"*

```
ShipmentParcel {
  shipmentId: "sh_xyz"
  bookingId:  "bk_abc123"
  status:     "IN_TRANSIT"
  loadedAt:   "2024-01-15T08:00:00Z"
  unloadedAt: null   ← filled when parcel is unloaded at destination
}
```

**Status lifecycle:**
```
LOADED → IN_TRANSIT → UNLOADED
```

---

### 7. ParcelMovement
**File:** `ParcelMovement.ts`

The audit log. One record is created every time a parcel
moves between hubs. This is the source of truth for the
full tracking history of a parcel.

This is the **parcel-centric view**.

```
ParcelMovement records for a Mumbai → Delhi parcel:

  Record 1: bookingId: "bk_abc", fromHub: null,      toHub: "Mumbai", status: LOADED
  Record 2: bookingId: "bk_abc", fromHub: "Mumbai",  toHub: "Nagpur", status: IN_TRANSIT
  Record 3: bookingId: "bk_abc", fromHub: "Nagpur",  toHub: "Nagpur", status: ARRIVED
  Record 4: bookingId: "bk_abc", fromHub: "Nagpur",  toHub: "Delhi",  status: IN_TRANSIT
  Record 5: bookingId: "bk_abc", fromHub: "Delhi",   toHub: null,     status: OUT_FOR_DELIVERY
  Record 6: bookingId: "bk_abc", fromHub: null,      toHub: null,     status: DELIVERED
```

**Never delete or update ParcelMovement records.**
They are append-only. Insert a new record for every status change.

---

## How it all works together — complete flow

### Step 1 — Agency sets up the network (one time)
```
Agency creates RouteGroup: "Mumbai–Delhi Express"
Agency adds RouteSegments:
  Mumbai → Nagpur  (order 1, 420km)
  Nagpur  → Delhi   (order 2, 520km)
```

### Step 2 — Customer books a parcel
```
Booking created {
  pickupAddress:   Mumbai
  deliveryAddress: Delhi
  status:          CONFIRMED
  logistics: {
    parcelRouteId: null   ← not yet computed
    routeHubs:     []
  }
}
```

### Step 3 — System computes the route
```
System finds segment chain: Mumbai→Nagpur → Nagpur→Delhi

ParcelRoute created { bookingId: "bk_abc", status: "PLANNED" }

ParcelRouteLeg 1 { segmentId: "Mumbai→Nagpur", legOrder: 1, status: PENDING }
ParcelRouteLeg 2 { segmentId: "Nagpur→Delhi",  legOrder: 2, status: PENDING }

Booking.logistics.parcelRouteId = "pr_xyz"
```

### Step 4 — First mile pickup
```
HubShipment created {
  type:       BULK_PICKUP
  fromHubId:  null
  toHubId:    "hub_mumbai"
  status:     PENDING
}

ShipmentParcel created { shipmentId: "sh_1", bookingId: "bk_abc", status: LOADED }
ParcelMovement created { bookingId: "bk_abc", status: LOADED }
```

### Step 5 — Parcel arrives at origin hub (Mumbai)
```
HubShipment.status → ARRIVED
ShipmentParcel.status → UNLOADED
ParcelMovement created { status: ARRIVED, toHubId: "hub_mumbai" }
Booking.logistics.routeHubs[0] = { hubId: "hub_mumbai", arrivedAt: now }
```

### Step 6 — Loaded onto linehaul truck (Mumbai → Nagpur)
```
HubShipment created {
  type:      HUB_TRANSFER
  segmentId: "seg_mumbai_nagpur"
  status:    LOADING
}

ParcelRouteLeg 1 { shipmentId: "sh_2", status: IN_PROGRESS }
ShipmentParcel created { shipmentId: "sh_2", bookingId: "bk_abc" }
ParcelMovement created { status: IN_TRANSIT, fromHubId: "hub_mumbai", toHubId: "hub_nagpur" }
Booking.logistics.routeHubs[0].departedAt = now
```

### Step 7 — Truck arrives at Nagpur hub
```
HubShipment.status → ARRIVED, arrivedAt = now
ShipmentParcel.status → UNLOADED
ParcelMovement created { status: ARRIVED, toHubId: "hub_nagpur" }
ParcelRouteLeg 1.status → COMPLETED

Booking.logistics.routeHubs[1] = { hubId: "hub_nagpur", arrivedAt: now }
```

### Step 8 — Repeat steps 6-7 for Nagpur → Delhi
```
ParcelRouteLeg 2 executes on a new HubShipment
ParcelRoute.status → IN_PROGRESS
```

### Step 9 — Last mile delivery (Delhi → Recipient)
```
HubShipment created {
  type:       OUT_FOR_DELIVERY
  fromHubId:  "hub_delhi"
  toHubId:    null
  status:     DISPATCHED
}

ParcelMovement created { status: OUT_FOR_DELIVERY }
```

### Step 10 — Delivered
```
Booking.status → DELIVERED
ParcelMovement created { status: DELIVERED }
HubShipment.status → COMPLETED
ParcelRoute.status → COMPLETED
ParcelRouteLeg 2.status → COMPLETED
Booking.logistics.routeHubs[2].departedAt = now
```

---

## Entity relationship summary

```
Booking
  └── ParcelRoute          (the plan)
        └── ParcelRouteLeg (one per hop)
              └── RouteSegment (the corridor hop)
                    └── RouteGroup (the corridor)

RouteSegment
  └── HubShipment          (the truck running this hop)
        └── ShipmentParcel (manifest — parcels on this truck)

Booking
  └── ParcelMovement       (append-only audit trail)
```

---

## Common mistakes to avoid

**1. Confusing segmentOrder and legOrder**
`RouteSegment.segmentOrder` is the hop's position inside its corridor.
`ParcelRouteLeg.legOrder` is the hop's position in a specific parcel's journey.
They are different things and both are needed.

**2. Updating ParcelMovement records**
ParcelMovement is append-only. Never update an existing record.
Always insert a new one for each status change.

**3. Assuming segmentId is always set on HubShipment**
Only `HUB_TRANSFER` shipments have a segmentId.
`BULK_PICKUP` and `OUT_FOR_DELIVERY` shipments have `segmentId: null`.

**4. Dual-write on Booking.logistics.routeHubs**
Every movement event must update BOTH `ParcelMovement` AND
`Booking.logistics.routeHubs`. Wrap both in a transaction.
If one fails, roll back both — otherwise tracking shows stale data.

**5. Deleting inactive RouteSegments**
Never delete a segment that has been used by a ParcelRouteLeg.
Set `isActive: false` instead to preserve history.

---

## Folder structure

```
src/Domain/Entities/Logistics/
  ├── RouteGroup.ts         — corridor definition
  ├── RouteSegment.ts       — single hub-to-hub hop
  ├── ParcelRoute.ts        — computed plan for one parcel
  ├── ParcelRouteLeg.ts     — one planned hop in that plan
  ├── HubShipment.ts        — one physical truck dispatch
  ├── ShipmentParcel.ts     — manifest entry (parcel on truck)
  └── ParcelMovement.ts     — append-only audit trail
```

---

*Last updated: March 2026*
*If you change any entity, update this document too.*