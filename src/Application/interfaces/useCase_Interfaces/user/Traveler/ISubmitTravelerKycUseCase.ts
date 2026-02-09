import { WorkerKYCFileFields } from "../../../../../Infrastructure/services/storage/multer";
import { SubmitTravelerKycRequestDTO } from "../../../../Dto/User/traveler.dto";

export interface ISubmitTravelerKycUseCase {
    execute(userId: string, dto: SubmitTravelerKycRequestDTO, files: WorkerKYCFileFields ): Promise<void>;

}