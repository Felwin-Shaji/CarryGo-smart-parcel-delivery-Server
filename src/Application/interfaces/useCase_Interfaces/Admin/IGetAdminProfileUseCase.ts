import { AdminProfileResponseDTO } from "../../../Dto/Admin/adminProfile.dto";

export interface IGetAdminProfileUseCase{
    execute(adminId:string):Promise<AdminProfileResponseDTO>;
}