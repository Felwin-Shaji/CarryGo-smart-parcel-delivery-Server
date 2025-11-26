import { Role, KYCStatus } from "../../../Infrastructure/Types/types";

export type IDType = "AADHAAR" | "DL" | "PASSPORT";

export interface IKYCVerification {
  id: string | null;
  subjectId: string;
  subjectType: Role;            
  idType: IDType;                
  idNumberEncrypted: string;
  documentUrl: string;
  selfieUrl: string;
  status: KYCStatus;             
  createdAt: Date;
  reviewedAt: Date | null;
}
