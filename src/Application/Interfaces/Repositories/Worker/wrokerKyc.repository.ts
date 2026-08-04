
import { IWrokerKYCVerification } from "../../../../Domain/Entities/Worker/WorkerKyc";
import { IBaseRepository } from "../base.repository";


export interface IHubWorkerKycRepository extends IBaseRepository<IWrokerKYCVerification> {
    getKycBySubjectId(subjectId: string, subjectType: "user" | "worker"): Promise<IWrokerKYCVerification | null>;
}