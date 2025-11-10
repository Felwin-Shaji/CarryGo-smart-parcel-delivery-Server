import type { Role } from "../../../Infrastructure/Types/types.js";

export interface SendOtpDTO {
  name: string;
  email: string;
  mobile?: string;
  password: string;
  role: Role;
};

export interface OtpResponseDTO {
  success: boolean;
  message: string;
  email: string;
  role: string;
  expiresAt: Date;
};

export interface VerifyOtpResponseDTO {
  success: boolean;
  message: string;
  email: string;
  role: string;
};



