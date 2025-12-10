// import { HubWorker } from "../../../Domain/Entities/Worker/HubWorker";
import { Types } from "mongoose";
import { HubWorker } from "../../../Domain/Entities/Worker/Worker";
import { WorkerResponseDTO } from "../../Dto/Workers/worker.dto";
import { IDType, IWrokerKYCVerification } from "../../../Domain/Entities/Worker/WorkerKyc";
import { KYCStatus } from "../../../Infrastructure/Types/types";

export class WorkerMapper {

    static toCreateWorker(
        tempWorker: any,
        hashedPassword: string,
    ): HubWorker {
        return new HubWorker(
            null,
            new Types.ObjectId(tempWorker.hubId),
            tempWorker.name,
            tempWorker.email,
            tempWorker.mobile,
            hashedPassword,
            "worker",
            "REGISTERED",
            0,
            false,
            undefined,
            undefined,
        );
    }

    static toWorkerKycEntity(
        workerId: string,
        idType: IDType,
        documentUrl: string,
        selfieUrl: string,
        idNumberEncrypted: string   
    ): IWrokerKYCVerification {

        return {
            id: null,
            subjectId: workerId,
            subjectType: "worker",
            idType,
            idNumberEncrypted,
            documentUrl,
            selfieUrl,
            status: "PENDING" as KYCStatus,
            createdAt: new Date(),
            reviewedAt: null,
        };
    }


    static toAddWorkerResponseDTO(worker: any): WorkerResponseDTO {
        return {
            id: worker._id,
            hubId: worker.hubId,
            name: worker.name,
            email: worker.email,
            mobile: worker.mobile,
            kycStatus: worker.kycStatus,
            kycDocumentUrl: worker.kycDocumentUrl ?? null,
            kycSelfieUrl: worker.kycSelfieUrl ?? null,
            role: worker.role,
            createdAt: worker.createdAt,
        };
    }
}
