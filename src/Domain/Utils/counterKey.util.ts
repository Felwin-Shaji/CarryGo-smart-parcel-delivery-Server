import { DeliveryPartnerType } from "../../Infrastructure/Types/types";

const partnerTypeMap: Record<DeliveryPartnerType, string> = {
    AGENCY: "AG",
    TRAVELER: "TR",
};

export function buildCounterKey(
    partnerType: DeliveryPartnerType
): string {
    const partnerCode = partnerTypeMap[partnerType];

    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, "0");

    return `${partnerCode}-${year}${month}`;
}