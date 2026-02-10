import { GetUserOverviewResponseDTO } from "../../../Dto/User/user.dto";

export interface IGetUserOverviewUseCase {
    execute(userId: string): Promise<GetUserOverviewResponseDTO>;
}