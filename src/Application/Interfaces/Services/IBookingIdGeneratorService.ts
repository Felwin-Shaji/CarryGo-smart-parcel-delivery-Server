import { DeliveryPartnerType } from "../../../Infrastructure/Types/types";

export interface GenerateBookingIdDTO {
    seq: number;
    agencyName: string;
    partnerType: DeliveryPartnerType;
}

export interface IBookingIdGeneratorService {
    generateBookingId(dto: GenerateBookingIdDTO): string;
}