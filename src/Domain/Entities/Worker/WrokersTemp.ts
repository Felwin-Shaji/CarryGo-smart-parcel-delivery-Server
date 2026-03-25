import { Role } from "../../../Infrastructure/Types/types";
import { WorkerRole } from "./Worker";

export interface HubWorkersTemp {
    name: string;
    email: string;
    mobile: string;
    otp: string;
    role: Role | "worker";
    workerRole: WorkerRole;
    status: "BASIC-Info" | "OTP-Verified";
    expiresAt: Date;
    _id?: string | null;
}
 