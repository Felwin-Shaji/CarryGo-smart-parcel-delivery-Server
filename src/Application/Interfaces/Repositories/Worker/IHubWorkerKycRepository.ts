
import { IWrokerKYCVerification } from "../../../../Domain/Entities/Worker/WorkerKYC";
import { IBaseRepository } from "../IBaseRepository";


export interface IHubWorkerKycRepository extends IBaseRepository<IWrokerKYCVerification> {
    getKycBySubjectId(subjectId: string, subjectType: "user" | "worker"): Promise<IWrokerKYCVerification | null>;
}