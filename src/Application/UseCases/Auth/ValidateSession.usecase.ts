import { inject, injectable } from "tsyringe";
import { IValidateSessionUseCase, ValidateSessionDTO } from "../../Interfaces/UseCases/Auth/IValidateSessionUseCase";
import { IUserRepository } from "../../Interfaces/Repositories/User/user.repository";
import { IAdminRepository } from "../../Interfaces/Repositories/Admin/IAdminRepository";
import { IAgencyRepository } from "../../Interfaces/Repositories/Agency/agency.repository";
import { IHubRepository } from "../../Interfaces/Repositories/Hub/hub.repository";
import { IHubWorkerRepository } from "../../Interfaces/Repositories/Worker/worker.repository";
import { AppError } from "../../../Domain/Utils/customError";
import { AUTH_MESSAGES } from "../../../Infrastructure/constants/messages/authMessages";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";

@injectable()
export class ValidateSessionUseCase implements IValidateSessionUseCase {
    constructor(
        @inject("IUserRepository") private userRepo: IUserRepository,
        @inject("IAdminRepository") private adminRepo: IAdminRepository,
        @inject("IAgencyRepository") private agencyRepo: IAgencyRepository,
        @inject("IHubRepository") private hubRepo: IHubRepository,
        @inject("IHubWorkerRepository") private workerRepo: IHubWorkerRepository,
    ) { }

    async execute({ userId, role, tokenVersion }: ValidateSessionDTO): Promise<void> {
        let user = null;

        if (role === "user") user = await this.userRepo.findById({ _id: userId });
        if (role === "admin") user = await this.adminRepo.findById({ _id: userId });
        if (role === "agency") user = await this.agencyRepo.findById({ _id: userId });
        if (role === "hub") user = await this.hubRepo.findById({ _id: userId });
        if (role === "worker") user = await this.workerRepo.findById({ _id: userId });

        if (!user) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS.UNAUTHORIZED);

        if (user.isBlocked) throw new AppError(AUTH_MESSAGES.USER_BLOCKED, STATUS.UNAUTHORIZED);

        if (user.tokenVersion !== tokenVersion) throw new AppError(AUTH_MESSAGES.TOKEN_INVALID, STATUS.UNAUTHORIZED);

    }
}
