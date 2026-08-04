import { GetUserOverviewResponseDTO } from "../../../DTOs/User/UserDTO";

export interface IGetUserOverviewUseCase {
    execute(userId: string): Promise<GetUserOverviewResponseDTO>;
}