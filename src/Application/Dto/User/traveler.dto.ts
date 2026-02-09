import { IDType } from "../../../Domain/Entities/Worker/WorkerKyc";

export interface SubmitTravelerKycRequestDTO {
    idType: IDType;
    idNumber: string;
}