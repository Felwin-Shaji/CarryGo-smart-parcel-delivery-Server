import { inject, injectable } from "tsyringe";
import { IGetAdminProfileUseCase } from "../../interfaces/useCase_Interfaces/Admin/IGetAdminProfileUseCase";
import { IAdminRepository } from "../../interfaces/repositories_interfaces/adminRepositories_Interfaces/IAdminRepository";
import { AppError } from "../../../Domain/utils/customError";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { AdminProfileResponseDTO } from "../../Dto/Admin/adminProfile.dto";
import { AdminProfileMapper } from "../../Mappers/Admin/AdminProfileMapper";
import { ADMIN_MESSAGES } from "../../../Infrastructure/constants/messages/adminMessages";

@injectable()
export class GetAdminProfileUseCase implements IGetAdminProfileUseCase {
    constructor(
        @inject("IAdminRepository") private readonly _adminRepo: IAdminRepository
    ) { }

    async execute(adminId: string): Promise<AdminProfileResponseDTO> {
        const adminData = await this._adminRepo.findById({ _id: adminId });

        if (!adminData) {
            throw new AppError(
                ADMIN_MESSAGES.NOT_FOUND,
                STATUS.NOT_FOUND
            );
        }

        const responseData =
            AdminProfileMapper.toGetAdminProfileResponseDTO(adminData);

        return responseData;
    }
}
