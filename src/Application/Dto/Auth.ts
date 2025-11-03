import type { Role } from "../../Infrastructure/Types/types.js";


export interface UserDTO {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role:Role
}