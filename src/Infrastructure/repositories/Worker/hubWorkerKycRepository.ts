import { IHubWorkerKycRepository } from "../../../Application/interfaces/repositories_interfaces/workerRepository_interfaces/wrokerKyc.repository";
import { IWrokerKYCVerification } from "../../../Domain/Entities/Worker/WorkerKyc";
import { KYCVerificationModel } from "../../database/models/Worker/workerKycVarificationModel";
import { BaseRepository } from "../baseRepositories";


export class HubWorkerKycRepository extends BaseRepository<IWrokerKYCVerification> implements IHubWorkerKycRepository {
    constructor() {
        super(KYCVerificationModel)
    };

    getKycBySubjectId(subjectId: string, subjectType: "user" | "worker"): Promise<IWrokerKYCVerification | null> {
        return this.model.findOne({ subjectId, subjectType }).exec();
    }
}