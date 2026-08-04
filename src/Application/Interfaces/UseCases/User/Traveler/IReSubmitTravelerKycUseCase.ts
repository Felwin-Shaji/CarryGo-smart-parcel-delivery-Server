import { WorkerKYCFileFields } from "../../../../../Infrastructure/Services/Storage/multer";
import { SubmitTravelerKycRequestDTO } from "../../../../DTOs/User/traveler.dto";

export interface IReSubmitTravelerKycUseCase {
    execute(userId: string, kycData: SubmitTravelerKycRequestDTO, files: WorkerKYCFileFields): Promise<void>;
}