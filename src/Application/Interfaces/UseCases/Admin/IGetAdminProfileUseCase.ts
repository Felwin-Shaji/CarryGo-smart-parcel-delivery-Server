import { AdminProfileResponseDTO } from "../../../DTOs/Admin/adminProfile.dto";

export interface IGetAdminProfileUseCase{
    execute(adminId:string):Promise<AdminProfileResponseDTO>;
}