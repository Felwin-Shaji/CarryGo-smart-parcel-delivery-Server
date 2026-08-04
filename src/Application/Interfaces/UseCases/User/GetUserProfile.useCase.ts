import { UserProfileResponseDTO } from "../../../DTOs/User/user.dto";

export interface IGetUserProfileUseCase{
    execute(userId:string):Promise<UserProfileResponseDTO>;
}