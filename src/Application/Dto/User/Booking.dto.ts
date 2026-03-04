import { AddressEntity, HubJourney, PartnerEntity } from "../../../Domain/Entities/Booking/Booking";
import { BookingStatusType, DeliveryPartnerType, PackageSizeType, PaymentGatewayType, PaymentMethodType, PaymentStatusType } from "../../../Infrastructure/Types/types";

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
  id: string | null;

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

export interface CalculatePriceRequestDTO {
  deliveryType: "AGENCY" | "TRAVELER";
  partnerId?: string;
  travelRequestId?: string;

  packageDetails: {
    category: string;
    size: "SMALL" | "MEDIUM" | "LARGE";
    weightKg: number;
  };

  pickupAddressId: string;
  deliveryAddressId: string;
}

export interface CalculatePriceResponseDTO {
  distanceKm: number;

  basePrice: number;
  distanceCharge: number;
  sizeCharge: number;
  platformFee: number;

  totalPrice: number;
  currency: "INR";
};


type AgencyBookingDTO = {
  deliveryType: "AGENCY";
  partnerId: string;
  pickupAddressId: string;
  deliveryAddressId: string;
  packageDetails: {
    category: string;
    size: "SMALL" | "MEDIUM" | "LARGE";
    weightKg: number;
  };
};

type TravelerBookingDTO = {
  deliveryType: "TRAVELER";
  partnerId: string; // travelerId
  travelRequestId: string; // REQUIRED
  pickupAddressId: string;
  deliveryAddressId: string;
  packageDetails: {
    category: string;
    size: "SMALL" | "MEDIUM" | "LARGE";
    weightKg: number;
  };
};

export type CreateBookingRequestDTO =
  | AgencyBookingDTO
  | TravelerBookingDTO;



export interface UserBookingsDTO {
  id: string;

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

  packageDetails: {
    category: string;
    size: PackageSizeType;
    weightKg: number;
  };

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

  packageDetails: {
    category: string;
    size: PackageSizeType;
    weightKg: number;
  };

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


export interface BookingFilterDTO {
  page: number;
  limit: number;

  deliveryType?: string;
  status?: string;
  paymentStatus?: string;

  size?: string;

  minPrice?: number;
  maxPrice?: number;
}
