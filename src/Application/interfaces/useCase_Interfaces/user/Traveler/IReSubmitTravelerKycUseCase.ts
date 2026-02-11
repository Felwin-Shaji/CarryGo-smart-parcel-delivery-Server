import { WorkerKYCFileFields } from "../../../../../Infrastructure/services/storage/multer";
import { SubmitTravelerKycRequestDTO } from "../../../../Dto/User/traveler.dto";

export interface IReSubmitTravelerKycUseCase {
    execute(userId: string, kycData: SubmitTravelerKycRequestDTO, files: WorkerKYCFileFields): Promise<void>;
}