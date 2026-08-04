import { KYCStatus } from "../../../../Infrastructure/Types/types.js";
import { updateUserKycStatusDTO } from "../../../DTOs/User/UserDTO.js";

export interface IUpdateUserKycStatusUseCase  {
    execute(userId: string,dto:updateUserKycStatusDTO):Promise<KYCStatus>;
}
