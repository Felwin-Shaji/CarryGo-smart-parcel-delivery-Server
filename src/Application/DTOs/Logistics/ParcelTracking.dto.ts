import { AddressEntity } from "../../../Domain/Entities/Booking/Booking";

export interface AgencyParcelTrackingDTO {
    booking: {
        bookingId: string;
        status: string;

        from: AddressEntity;
        to: AddressEntity;

        createdAt: Date;
    };

    currentStatus: {
        status: string;

        hub: {
            id: string;
            name: string;

            address: {
                addressLine1: string;
                city: string;
                state: string;
                pincode: string;
            };

            coordinates: {
                lat: number;
                lng: number;
            };
        } | null;

        message: string;
        updatedAt: Date | null;
    };

    route: {
        legs: {
            legOrder: number;

            fromHub: HubDTO;
            toHub: HubDTO;

            status: string;
            shipmentId: string | null;
        }[];
    };

    timeline: {
        status: string;

        fromHub: HubDTO | null;
        toHub: HubDTO | null;

        message: string;
        timestamp?: Date;
    }[];

    shipment: {
        vehicleNumber: string | null;
        status: string | null;
        departedAt: Date | null;
        arrivedAt: Date | null;
    } | null;
}

export interface HubDTO {
    id: string;
    name: string;

    address: {
        addressLine1: string;
        city: string;
        state: string;
        pincode: string;
    };

    coordinates: {
        lat: number;
        lng: number;
    };
}

export interface TravelerParcelTrackingDTO {
    type: "TRAVELER";

    // Booking Info
    booking: {
        id: string;
        bookingId: string;
        status: string;

        from: {
            address: string;
            city: string;
            pincode: string;
            location: {
                lat: number;
                lng: number;
            };
        };

        to: {
            address: string;
            city: string;
            pincode: string;
            location: {
                lat: number;
                lng: number;
            };
        };

        package: {
            category: string;
            weightKg: number;
            fragile?: boolean;
        };

        price: number;

        createdAt: Date;
    };

    //  Traveler Info
    traveler: {
        id: string;
        name: string;
        email: string;
        phone: string | null;

        kycStatus: string;
    };

    // Current Status (Derived)
    currentStatus: {
        status: string;

        message: string;

        location: {
            lat: number;
            lng: number;
        } | null;

        updatedAt: Date | null;
    };

    // Trip Info (from TravelRequest)
    trip: {
        fromAddress: string;
        toAddress: string;

        fromPincode: string;
        toPincode: string;

        departureAt: Date;
        arrivalAt: Date | null;

        transportMode: string;
    };

    // Map Points
    checkpoints: {
        type: "PICKUP" | "IN_TRANSIT" | "DELIVERY";

        lat: number;
        lng: number;

        label: string;

        time?: Date;
    }[];

    // Timeline (VERY IMPORTANT)
    timeline: {
        status: string;
        message: string;
        timestamp: Date;
    }[];
}