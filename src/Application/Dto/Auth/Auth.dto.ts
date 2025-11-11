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
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
  }
  accessToken: string
};

export interface SendLoginResponse extends VerifyOtpResponseDTO{}

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



