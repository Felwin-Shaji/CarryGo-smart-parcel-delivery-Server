import { GetUserOverviewResponseDTO } from "../../../DTOs/User/user.dto";

export interface IGetUserOverviewUseCase {
    execute(userId: string): Promise<GetUserOverviewResponseDTO>;
}