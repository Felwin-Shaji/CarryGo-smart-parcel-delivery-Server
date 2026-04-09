import { AddressEntity, HubJourney, PackageDetails, PartnerEntity } from "../../../Domain/Entities/Booking/Booking";
import { BookingStatusType, DeliveryPartnerType, PaymentGatewayType, PaymentMethodType, PaymentStatusType } from "../../../Infrastructure/Types/types";
import { GeoLocation } from "../../interfaces/useCase_Interfaces/user/Booking/IFindServicableAgencyUsecase";

/**
 * Represents the response structure for user booking validate picode
 */
export interface ValidatePincodeResponseDTO {
  serviceable: boolean;
};


export interface ServiceableHubWithAgencyDTO {

  agency: {
    agencyId: string;
    name: string;
    commissionRate: number;
  };

  fromHub: {
    hubId: string;
    hubName: string;
    address: {
      city: string;
      state: string;
      pincode: string;
    };
    location: {
      lat: number;
      lng: number;
    };
  };

  toHub: {
    hubId: string;
    hubName: string;
    address: {
      city: string;
      state: string;
      pincode: string;
    };
    location: {
      lat: number;
      lng: number;
    };
  };
};

export interface ServiceableTravelerDTO {
  traveler: {
    travelerId: string;
    name: string;
  };

  travelRequest: {
    travelRequestId: string;
    from: {
      city: string;
      state: string;
      pincode: string;
    };
    to: {
      city: string;
      state: string;
      pincode: string;
    };
    departureAt: Date;
    arrivalAt: Date | null;
    remainingCapacityKg: number;
    pricePerKg: number | null;
    modeOfTransport: string;
  };
}

export interface ServiceableAgencyAndTravelerDTO {
  agencies: ServiceableHubWithAgencyDTO[],
  travelers: ServiceableTravelerDTO[]
}



export type AddressResponseDTO = {
  id?: string | null;

  label: "Home" | "Office" | "Warehouse" | "Other";

  formattedAddress: string | null;

  city: string;
  state: string;
  country: string;

  pincode: string;


  location: {
    lat: number;
    lng: number;
  };

  isDefault: boolean;
};

export type BookingAddressDTO = AddressResponseDTO;

export interface CalculatePriceRequestDTO {
  deliveryType: "AGENCY" | "TRAVELER";
  partnerId?: string;
  travelRequestId?: string;

  packageDetails: {
    category: string;

    weightKg: number;

    dimensions: {
      lengthCm: number;
      widthCm: number;
      heightCm: number;
    };

    fragile?: boolean;
  };

  pickupAddress: BookingAddressDTO;
  deliveryAddress: BookingAddressDTO;
}

export interface CalculatePriceResponseDTO {
  distanceKm: number;

  basePrice: number;
  distanceCharge: number;
  volumetricCharge: number;
  platformFee: number;

  totalPrice: number;
  currency: "INR";
};


type AgencyBookingDTO = {
  deliveryType: "AGENCY";
  partnerId: string;
  fromHubId: string;
  toHubId: string;

  pickupAddress: BookingAddressDTO;
  deliveryAddress: BookingAddressDTO;

  packageDetails: {
    category: string;

    weightKg: number;

    dimensions: {
      lengthCm: number;
      widthCm: number;
      heightCm: number;
    };

    fragile?: boolean;
  };
};

type TravelerBookingDTO = {
  deliveryType: "TRAVELER";

  partnerId: string;
  travelRequestId: string;

  pickupAddress: BookingAddressDTO;
  deliveryAddress: BookingAddressDTO;

  packageDetails: {
    category: string;

    weightKg: number;

    dimensions: {
      lengthCm: number;
      widthCm: number;
      heightCm: number;
    };

    fragile?: boolean;
  };
};

export type CreateBookingRequestDTO =
  | AgencyBookingDTO
  | TravelerBookingDTO;



export interface UserBookingsDTO {
  id: string;
  bookingId: string;
  createdAt: string;

  deliveryPartnerType: DeliveryPartnerType;
  partnerSnapshot?: {
    name: string;
    type: DeliveryPartnerType;
  } | null;

  pickupAddress: {
    city: string;
    pincode: string;
  };

  deliveryAddress: {
    city: string;
    pincode: string;
  };

  packageDetails: PackageDetails

  pricing: {
    totalAmount: number;
    currency: "INR";
  };

  distanceKm: number;

  payment: {
    paymentStatus: PaymentStatusType;
  };

  status: BookingStatusType;
}

export interface BookingListResponseDTO {
  bookings: UserBookingsDTO[],
  totalPages: number;
  totalCount: number;
}

export interface BookingDetailsResponse {
  id: string;
  createdAt: string;
  updatedAt: string;

  deliveryPartnerType: DeliveryPartnerType;
  partnerSnapshot: PartnerEntity | null;

  pickupAddress: AddressEntity;
  deliveryAddress: AddressEntity;

  packageDetails: PackageDetails

  pricing: {
    basePrice: number;
    distanceCharge: number;
    sizeCharge: number;
    platformFee: number;
    totalAmount: number;
    currency: "INR";
  };

  distanceKm: number;

  payment: {
    gateway: PaymentGatewayType;
    paymentMethod?: PaymentMethodType;
    paymentStatus: PaymentStatusType;
    orderRef?: string;
    paymentRef?: string;
    paidAt?: string;
    refundedAt?: string;
  };

  status: BookingStatusType;

  logistics?: {
    routeHubs: HubJourney[];
    currentHubId?: string;
    lastUpdatedAt?: string;
  };
}

export interface CheckServiceableAgencyDTO {
  pickupLocation: GeoLocation;
  deliveryLocation: GeoLocation;
  page?: number;
  limit?: number;
}

export interface CheckServiceableTravelerDTO {
  pickupLocation: { lat: number; lng: number };
  deliveryLocation: { lat: number; lng: number };
  page?: number;
  limit?: number;
}

export interface PaginationResponseDTO<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


export interface BookingFilterDTO {
  page: number;
  limit: number;

  deliveryType?: string;
  status?: string;
  paymentStatus?: string;

  // size?: string;

  minPrice?: number;
  maxPrice?: number;
}
