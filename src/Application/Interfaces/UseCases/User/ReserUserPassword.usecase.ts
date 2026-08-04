import { UserResetPasswordRequestDTO } from "../../../DTOs/User/user.dto";

export interface IUserReserUserPassword {
    execute(userId: string, dto: UserResetPasswordRequestDTO): Promise<void>
}