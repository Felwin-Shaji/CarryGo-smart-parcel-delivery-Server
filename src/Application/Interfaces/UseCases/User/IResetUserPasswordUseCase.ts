import { UserResetPasswordRequestDTO } from "../../../DTOs/User/UserDTO";

export interface IUserReserUserPassword {
    execute(userId: string, dto: UserResetPasswordRequestDTO): Promise<void>
}