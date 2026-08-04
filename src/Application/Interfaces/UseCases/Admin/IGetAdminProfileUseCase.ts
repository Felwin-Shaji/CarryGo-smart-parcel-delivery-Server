import { AdminProfileResponseDTO } from "../../../DTOs/Admin/AdminProfileDTO";

export interface IGetAdminProfileUseCase{
    execute(adminId:string):Promise<AdminProfileResponseDTO>;
}