export interface WorkerResponseDTO {
    id: string;
    hubId: string;
    name: string;
    email: string;
    mobile: string;
    role: "worker";
    kycStatus: "PENDING" | "VERIFIED" | "REJECTED";
    kycDocumentUrl: string | null;
    kycSelfieUrl: string | null;
    createdAt: Date;
}
