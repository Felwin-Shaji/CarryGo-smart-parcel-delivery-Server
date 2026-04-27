import { TravelerParcelTrackingDTO, AgencyParcelTrackingDTO } from "@/Application/Dto/Logistics/ParcelTracking.dto";
import { IGetAgencyTrackingUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/Tracking/IGetAgencyTrackingUsecase";
import { IGetTrackingUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/Tracking/IGetTrackingUsecase";
import { IGetTravelerTrackingUsecase } from "@/Application/interfaces/useCase_Interfaces/Logistics/Tracking/IGetTravelerTrackingUsecase";
import { AppError } from "@/Domain/utils/customError";
import { BOOKING_MESSAGE } from "@/Infrastructure/constants/messages/bookingMessages";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { Role } from "@/Infrastructure/Types/types";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetTrackingUsecase implements IGetTrackingUsecase {
    constructor(
        @inject("IGetAgencyTrackingUsecase") private _getAgencyTrackingUsecase: IGetAgencyTrackingUsecase,
        @inject("IGetTravelerTrackingUsecase") private _getTravelerTrackingUsecase: IGetTravelerTrackingUsecase
    ) { }

    execute(bookingId: string, role: Role, userId: string): Promise<TravelerParcelTrackingDTO | AgencyParcelTrackingDTO> {

        const type = this.getTrackingType(bookingId);

        if (type === "TRAVELER") {
            return this._getTravelerTrackingUsecase.execute(
                bookingId,
                role,
                userId
            );
        }

        if (type === "AGENCY") {
            return this._getAgencyTrackingUsecase.execute(
                bookingId,
                role,
                userId
            );
        }

        throw new AppError(BOOKING_MESSAGE.INVALID_ID, STATUS.BAD_REQUEST)


    }

    private getTrackingType(
        bookingId: string
    ): "TRAVELER" | "AGENCY" {

        if (bookingId.startsWith("CG-TR-")) return "TRAVELER";
        if (bookingId.startsWith("CG-AG-")) return "AGENCY";

        throw new AppError(BOOKING_MESSAGE.INVALID_ID);
    }
}