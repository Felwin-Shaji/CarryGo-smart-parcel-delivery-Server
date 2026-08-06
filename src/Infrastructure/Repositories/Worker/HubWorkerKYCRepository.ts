import { IHubWorkerKycRepository } from "../../../Application/Interfaces/Repositories/Worker/IHubWorkerKycRepository";
import { IWrokerKYCVerification } from "../../../Domain/Entities/Worker/WorkerKYC";
import { KYCVerificationModel } from "../../Database/Models/Worker/WorkerKYCVerificationModel";
import { BaseRepository } from "../BaseRepository";


export class HubWorkerKycRepository extends BaseRepository<IWrokerKYCVerification> implements IHubWorkerKycRepository {
    constructor() {
        super(KYCVerificationModel)
    };

    getKycBySubjectId(subjectId: string, subjectType: "user" | "worker"): Promise<IWrokerKYCVerification | null> {
        return this.model.findOne({ subjectId, subjectType }).exec();
    }
}