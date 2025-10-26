import type { Otp } from "../../Application/Dto/otp.dto.js";
import { AuthController } from "../../Interface_Adapters/controllers/AuthController.js";

import { sendOtpUseCase } from "./usecase.register.js";

export const authController = new AuthController(sendOtpUseCase)
