import { GetTravelerKycResponseDTO } from "../../../../DTOs/User/user.dto";

export interface IGetTravelerKycUseCase {
    execute(userId: string): Promise<GetTravelerKycResponseDTO>;
}