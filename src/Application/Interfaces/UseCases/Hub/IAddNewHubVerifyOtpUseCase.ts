import { AddNewHubVerifyOtpDTO } from "../../../DTOs/Agency/agency.dto";

export interface IAddNewHubVerifyOtpUseCase {
    verify(dto:AddNewHubVerifyOtpDTO): Promise<boolean>;
}
