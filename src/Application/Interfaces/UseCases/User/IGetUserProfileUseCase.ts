import { UserProfileResponseDTO } from "../../../DTOs/User/UserDTO";

export interface IGetUserProfileUseCase{
    execute(userId:string):Promise<UserProfileResponseDTO>;
}