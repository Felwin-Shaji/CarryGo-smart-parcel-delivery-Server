import { WorkerKYCFileFields } from "../../../../../Infrastructure/Services/Storage/multer";
import { SubmitTravelerKycRequestDTO } from "../../../../DTOs/User/traveler.dto";

export interface ISubmitTravelerKycUseCase {
    execute(userId: string, dto: SubmitTravelerKycRequestDTO, files: WorkerKYCFileFields ): Promise<void>;

}