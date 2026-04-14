import { Types } from "mongoose";
import { HubWorker } from "../../../Domain/Entities/Worker/Worker";
import { GetWorkerOverviewResponseDTO, WorkerResponseDTO } from "../../Dto/Workers/worker.dto";
import { IDType, IWrokerKYCVerification } from "../../../Domain/Entities/Worker/WorkerKyc";
import { KYCStatus, Role } from "../../../Infrastructure/Types/types";
import { AddWorkerTempRequestDTO, AddWorkerTempResponseDTO } from "../../Dto/Hub/hub.dto";
import { HubWorkersTemp } from "../../../Domain/Entities/Worker/WrokersTemp";
import { AppError } from "../../../Domain/utils/customError";

export class WorkerMapper {

    static toCreateWorker(
        tempWorker: HubWorkersTemp,
        hashedPassword: string,
        hubId: string,
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
            tempWorker.workerRole,
            "AVAILABLE",
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
            workerRole: dto.workerRole,
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
        idNumberEncrypted: string,
        role?: Role
    ): IWrokerKYCVerification {

        return {
            _id: null,
            subjectId: workerId,
            subjectType: role || "worker",
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
            id:worker.id!,
            hubId: worker.hubId.toString(),
            name: worker.name,
            email: worker.email,
            mobile: worker.mobile!,
            kycStatus: worker.kycStatus!,
            role: worker.role,
            workerRole: worker.workerRole,
            workingStatus: worker.workingStatus,
            createdAt: worker.createdAt,
        };
    }

    static toWorkerOverviewResponseDTO(
    worker: HubWorker,
    kyc: IWrokerKYCVerification | null
  ): GetWorkerOverviewResponseDTO {
    return {
      id: worker.id!,
      name: worker.name,
      email: worker.email,
  ...(worker.mobile && { mobile: worker.mobile }),

      role: worker.role,
      workerRole: worker.workerRole,
      workingStatus: worker.workingStatus,

      kycStatus: worker.kycStatus,
      walletBalance: worker.walletBalance,
      isBlocked: worker.isBlocked,

      createdAt: worker.createdAt,

      kyc: kyc
        ? {
            id: kyc._id!,
            subjectId: kyc.subjectId,
            subjectType: kyc.subjectType,
            idType: kyc.idType,
            idNumberEncrypted: kyc.idNumberEncrypted,
            documentUrl: kyc.documentUrl,
            selfieUrl: kyc.selfieUrl,
            status: kyc.status,
            createdAt: kyc.createdAt,
            reviewedAt: kyc.reviewedAt,
          }
        : null,
    };
  }
}
