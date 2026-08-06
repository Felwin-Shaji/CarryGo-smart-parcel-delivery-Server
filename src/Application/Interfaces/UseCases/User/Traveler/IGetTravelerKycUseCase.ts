import { GetTravelerKycResponseDTO } from "../../../../DTOs/User/UserDTO";

export interface IGetTravelerKycUseCase {
    execute(userId: string): Promise<GetTravelerKycResponseDTO>;
}