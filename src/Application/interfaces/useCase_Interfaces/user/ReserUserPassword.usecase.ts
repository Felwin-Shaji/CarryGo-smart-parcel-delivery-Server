import { UserResetPasswordRequestDTO } from "../../../Dto/User/user.dto";

export interface IUserReserUserPassword {
    execute(userId: string, dto: UserResetPasswordRequestDTO): Promise<void>
}