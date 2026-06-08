import { inject, injectable } from "tsyringe";
import { AppError } from "../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { IPasswordService } from "../../interfaces/services_Interfaces/password-service.interface";
import { IResetWorkerPasswordUseCase } from "../../interfaces/useCase_Interfaces/Worker/IResetWorkerPasswordUseCase";
import { IHubWorkerRepository } from "../../interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { WorkerResetPasswordRequestDTO } from "../../Dto/Workers/workerProfile.dto";

@injectable()
export class ResetWorkerPasswordUseCase implements IResetWorkerPasswordUseCase {
    constructor(
         @inject("IHubWorkerRepository") private _workerRepo: IHubWorkerRepository,
        @inject("IPasswordService") private __passwordService: IPasswordService

    ) {};

    async execute(workerId  : string, dto: WorkerResetPasswordRequestDTO): Promise<void> {
        const workerData = await this._workerRepo.findById({ _id: workerId });

        if (!workerData || !workerData.password) throw new AppError(USER_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        const isPasswordMatch = await this.__passwordService.comparePassword(dto.currentPassword, workerData.password);
        if (!isPasswordMatch) throw new AppError(USER_MESSAGES.PASSWORD_NOT_MATCHED, STATUS.BAD_REQUEST);

        const newHashedPassword = await this.__passwordService.hashPassword(dto.newPassword);

        const updatedWorkerData = await this._workerRepo.findOneAndUpdate({ _id: workerId }, { password: newHashedPassword })
        if (!updatedWorkerData) throw new AppError(USER_MESSAGES.RESET_PASSWORD_FAILURE, STATUS.NOT_FOUND)

        return
    }
}