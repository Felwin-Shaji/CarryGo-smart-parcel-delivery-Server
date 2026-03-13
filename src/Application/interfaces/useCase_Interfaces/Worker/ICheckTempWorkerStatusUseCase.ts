export interface CheckTempWorkerStatusResponseDTO {
    exists: boolean;
    status?: "BASIC-Info" | "OTP-Verified";
    tempWorkerId?: string;
}

export interface ICheckTempWorkerStatusUseCase {
    execute(id: string): Promise<CheckTempWorkerStatusResponseDTO>
}