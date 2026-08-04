import { KYCStatus } from "../../../../Infrastructure/Types/types.js";
import { updateUserKycStatusDTO } from "../../../DTOs/User/user.dto.js";

export interface IUpdateUserKycStatusUseCase  {
    execute(userId: string,dto:updateUserKycStatusDTO):Promise<KYCStatus>;
}
