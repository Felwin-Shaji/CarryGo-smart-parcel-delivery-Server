import { inject, injectable } from "tsyringe";

import { AppError } from "../../../Domain/Utils/customError";
import { IAdminRepository } from "../../Interfaces/Repositories/Admin/IAdminRepository";
import { ADMIN_MESSAGES } from "../../../Infrastructure/constants/messages/adminMessages";
import { AdminProfileMapper } from "../../Mappers/Admin/AdminProfileMapper";
import { AdminProfileResponseDTO, EditAdminProfileRequestDto } from "../../DTOs/Admin/adminProfile.dto";
import { IEditAdminProfileUseCase } from "../../Interfaces/UseCases/Admin/IEditAdminProfileUseCase";

@injectable()
export class EditAdminProfileUseCase implements IEditAdminProfileUseCase {
    constructor(
        @inject("IAdminRepository") private readonly _adminRepo: IAdminRepository
    ) { };

    async execute(userId: string, dto: EditAdminProfileRequestDto): Promise<AdminProfileResponseDTO> {

        const userData = await this._adminRepo.findOneAndUpdate({ _id: userId }, dto);
        if (!userData) throw new AppError(ADMIN_MESSAGES.PROFILE_UPDATE_FAILURE);

        return AdminProfileMapper.toGetAdminProfileResponseDTO(userData);
    }
}