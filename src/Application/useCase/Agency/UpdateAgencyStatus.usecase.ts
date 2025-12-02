import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/utils/customError";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IAgencyRepository } from "../../interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { IUpdateAgencyStatusUseCase } from "../../interfaces/useCase_Interfaces/Agency/UpdateAgencyStatusUseCase";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";


@injectable()
export class UpdateAgencyStatusUseCase implements IUpdateAgencyStatusUseCase {
    constructor(
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
    ) { }
    async execute(dto: { userId: string, isBlocked: boolean }): Promise<void> {
        const user = await this._agencyRepo.findById({ _id: dto.userId });
        if (!user) throw new AppError(AGENCY_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        await this._agencyRepo.findOneAndUpdate({ _id: dto.userId }, { isBlocked: dto.isBlocked })

    }
} 