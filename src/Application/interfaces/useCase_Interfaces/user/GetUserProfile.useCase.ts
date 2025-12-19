import { UserProfileResponseDTO } from "../../../Dto/User/user.dto";

export interface IGetUserProfileUseCase{
    execute(userId:string):Promise<UserProfileResponseDTO>;
}