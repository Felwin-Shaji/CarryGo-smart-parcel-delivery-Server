import { AddNewHubVerifyOtpDTO } from "../../../DTOs/Agency/AgencyDTO";

export interface IAddNewHubVerifyOtpUseCase {
    verify(dto:AddNewHubVerifyOtpDTO): Promise<boolean>;
}
