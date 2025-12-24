import { Types } from "mongoose";
import { HubWorker } from "../../../Domain/Entities/Worker/Worker";
import { WorkerResponseDTO } from "../../Dto/Workers/worker.dto";
import { IDType, IWrokerKYCVerification } from "../../../Domain/Entities/Worker/WorkerKyc";
import { KYCStatus } from "../../../Infrastructure/Types/types";
import { AddWorkerTempRequestDTO, AddWorkerTempResponseDTO } from "../../Dto/Hub/hub.dto";
import { HubWorkersTemp } from "../../../Domain/Entities/Worker/WrokersTemp";
import { AppError } from "../../../Domain/utils/customError";

export class WorkerMapper {

    static toCreateWorker(
        tempWorker: HubWorkersTemp,
        hashedPassword: string,
        hubId:string,
    ): HubWorker {

        if (!hubId) {
            throw new AppError("Hub ID missing in temp worker");
        }
        return new HubWorker(
            null,
            new Types.ObjectId(hubId),
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

    static toTempWorkerEntity(hubId: string, dto: AddWorkerTempRequestDTO, hashOtp: string): HubWorkersTemp {
        const expiresAt = new Date(Date.now() + 1000 * 60 * 2);
        return ({
            name: dto.name,
            email: dto.email,
            mobile: dto.mobile,
            role: dto.role,
            otp: hashOtp,
            status: "BASIC-Info",
            expiresAt,

        })
    }

    static toAddWorkerTempResponse(saved: HubWorkersTemp): AddWorkerTempResponseDTO {
        return {
            email: saved.email,
            expiresAt: saved.expiresAt!,
            tempWorkerId: saved._id!,
        }
    }

    static toWorkerKycEntity(
        workerId: string,
        idType: IDType,
        documentUrl: string,
        selfieUrl: string,
        idNumberEncrypted: string
    ): IWrokerKYCVerification {

        return {
            _id: null,
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


    static toAddWorkerResponseDTO(worker: HubWorker): WorkerResponseDTO {
        return {
            hubId: worker.hubId.toString(),
            name: worker.name,
            email: worker.email,
            mobile: worker.mobile!,
            kycStatus: worker.kycStatus!,
            role: worker.role,
            createdAt: worker.createdAt,
        };
    }
}
