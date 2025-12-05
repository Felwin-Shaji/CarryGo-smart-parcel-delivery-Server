import type { KYCStatus, Role } from "../../../Infrastructure/Types/types.js";

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
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
    kycStatus:KYCStatus;
    accessToken: string
  }
};

export interface SendLoginResponse extends VerifyOtpResponseDTO { }

export interface UserDTO {
  name: string;
  email: string;
  mobile?: string | null;
  password?: string | null;
  role: Role;
}



export interface LoginDTO {
  email: string;
  password: string;
  role: Role;
}

export interface LogoutDTO {
  id: string
  role: Role;
}

export interface SendLogoutResponseDTO {
  success: boolean;
  message: string;
}


export interface ResendOtpDTO {
  email: string;
  role: string;
}

export interface VerifyOtpDTO {
  email: string;
  otp: string;
  role: string;
}

export interface ForgotPasswordDTO {
    email: string;
    role:Role
}



