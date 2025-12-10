import { inject, injectable } from "tsyringe";
import { KYCStatus } from "../../../Infrastructure/Types/types";
import { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { IUpdateAgencyKycStatusUseCase } from "../../interfaces/useCase_Interfaces/Agency/UpdateAgencyKycStatusUseCase";
import { updateAgencyKycStatusDTO } from "../../Dto/Agency/agency.dto";
import { AppError } from "../../../Domain/utils/customError";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";

@injectable()
export class UpdateAgencyKycStatusUseCase implements IUpdateAgencyKycStatusUseCase {
    constructor(
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
    ) { }

    async execute(agencyId: string, dto: updateAgencyKycStatusDTO): Promise<KYCStatus> {

        const result = await this._agencyRepo.findOneAndUpdate(
            { _id: agencyId },
            { kycStatus: dto.status, rejectReason: dto.rejectReason }
        );

        if (!result) throw new AppError(AGENCY_MESSAGES.KYC_STATUS_UPDATION_FAILED, STATUS.NOT_FOUND);

        return result.kycStatus;
    };
};