import { Role, KYCStatus } from "../../../Infrastructure/Types/types";

export type IDType = "AADHAAR" | "DL" | "PASSPORT";

export interface IWrokerKYCVerification {
  subjectId: string;
  subjectType: Role;            
  idType: IDType;                
  idNumberEncrypted: string;
  documentUrl: string;
  selfieUrl: string;
  status: KYCStatus;             
  createdAt: Date;
  reviewedAt: Date | null;
  _id?: string | null;
}
