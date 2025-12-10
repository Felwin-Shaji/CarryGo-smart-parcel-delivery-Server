import { AddNewHubVerifyOtpDTO } from "../../../Dto/Agency/agency.dto";

export interface IAddNewHubVerifyOtpUseCase {
    verify(dto:AddNewHubVerifyOtpDTO): Promise<boolean>;
}
