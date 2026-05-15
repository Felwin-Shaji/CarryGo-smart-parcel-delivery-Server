import { IGetAgencyTrackingUsecase } from "../../../interfaces/useCase_Interfaces/Logistics/Tracking/IGetAgencyTrackingUsecase";
import { IGetTrackingUsecase } from "../../../interfaces/useCase_Interfaces/Logistics/Tracking/IGetTrackingUsecase";
import { IGetTravelerTrackingUsecase } from "../../../interfaces/useCase_Interfaces/Logistics/Tracking/IGetTravelerTrackingUsecase";
import { Role } from "../../../../Infrastructure/Types/types";
import { BOOKING_MESSAGE } from "../../../../Infrastructure/constants/messages/bookingMessages";
import { AppError } from "../../../../Domain/utils/customError";
import { STATUS } from "../../../../Infrastructure/constants/statusCodes";
import { inject, injectable } from "tsyringe";
import { AgencyParcelTrackingDTO, TravelerParcelTrackingDTO } from "../../../Dto/Logistics/ParcelTracking.dto";

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