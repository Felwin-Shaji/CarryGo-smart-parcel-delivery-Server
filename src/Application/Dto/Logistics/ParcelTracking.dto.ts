import { AddressEntity } from "@/Domain/Entities/Booking/Booking";

export interface ParcelTrackingDTO {
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