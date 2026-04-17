import { GetTravelerKycResponseDTO } from "../../../../Dto/User/user.dto";

export interface IGetTravelerKycUseCase {
    execute(userId: string): Promise<GetTravelerKycResponseDTO>;
}