import type { Role } from "../../Infrastructure/Types/types.js";


export interface UserDTO {
  name: string;
  email: string;
  mobile?: string | null;  // 👈 optional
  password?: string | null;
  role: Role;
}
