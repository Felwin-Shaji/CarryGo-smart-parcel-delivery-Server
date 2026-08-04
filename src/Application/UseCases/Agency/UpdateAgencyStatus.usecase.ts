import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/Utils/customError";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IAgencyRepository } from "../../Interfaces/Repositories/Agency/agency.repository";
import { IUpdateAgencyStatusUseCase } from "../../Interfaces/UseCases/Agency/UpdateAgencyStatusUseCase";
import { AGENCY_MESSAGES } from "../../../Infrastructure/constants/messages/agencyMessages";


@injectable()
export class UpdateAgencyStatusUseCase implements IUpdateAgencyStatusUseCase {
    constructor(
        @inject("IAgencyRepository") private _agencyRepo: IAgencyRepository,
    ) { }
    async execute(agencyId: string, isBlocked: boolean): Promise<void> {
        const user = await this._agencyRepo.findById({ _id: agencyId });
        console.log(user)

        if (!user) throw new AppError(AGENCY_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        const newTokenVersion = user.tokenVersion + 1

        await this._agencyRepo.findOneAndUpdate({ _id: agencyId }, { isBlocked: isBlocked, tokenVersion: newTokenVersion })

    }
} 