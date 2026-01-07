import { inject, injectable } from "tsyringe";

import { AppError } from "../../../Domain/utils/customError";
import { IAdminRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/admin.repository";
import { ADMIN_MESSAGES } from "../../../Infrastructure/constants/messages/adminMessages";
import { AdminProfileMapper } from "../../Mappers/Admin/AdminProfileMapper";
import { AdminProfileResponseDTO, EditAdminProfileRequestDto } from "../../Dto/Admin/adminProfile.dto";
import { IEditAdminProfileUseCase } from "../../interfaces/useCase_Interfaces/Admin/IEditAdminProfileUseCase";

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