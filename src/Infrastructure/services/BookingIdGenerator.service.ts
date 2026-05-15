import { GenerateBookingIdDTO, IBookingIdGeneratorService } from "../../Application/interfaces/services_Interfaces/IBookingIdGeneratorService";
import { DeliveryPartnerType } from "../Types/types";


export class BookingIdGeneratorService implements IBookingIdGeneratorService {

    generateBookingId(dto: GenerateBookingIdDTO): string {
        const { seq, partnerType } = dto;

        const partnerTypeCode = this.mapPartnerType(partnerType);

        const now = new Date();
        const year = now.getFullYear().toString().slice(-2);
        const month = String(now.getMonth() + 1).padStart(2, "0");

        const sequence = String(seq).padStart(6, "0");

        return `CG-${partnerTypeCode}-${year}${month}-${sequence}`;
    }

    // ---------------- Helpers ----------------

    private mapPartnerType(type: DeliveryPartnerType): string {
        const map: Record<DeliveryPartnerType, string> = {
            TRAVELER: "TR",
            AGENCY: "AG",
        };
        return map[type];
    }
}