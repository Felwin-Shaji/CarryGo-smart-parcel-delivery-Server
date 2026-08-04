import { inject, injectable } from "tsyringe";
import { IGetAdminProfileUseCase } from "../../Interfaces/UseCases/Admin/IGetAdminProfileUseCase";
import { IAdminRepository } from "../../Interfaces/Repositories/Admin/IAdminRepository";
import { AppError } from "../../../Domain/Utils/customError";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { AdminProfileResponseDTO } from "../../DTOs/Admin/adminProfile.dto";
import { AdminProfileMapper } from "../../Mappers/Admin/AdminProfileMapper";
import { ADMIN_MESSAGES } from "../../../Infrastructure/Constants/Messages/adminMessages";

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
