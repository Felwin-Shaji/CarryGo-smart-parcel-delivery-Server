import type { Otp } from "../../Application/Dto/otp.dto.js";
import { SendOtpUseCase } from "../../Application/useCase/send-otp.usecase.js";
import type { User } from "../../Domain/Entities/User.js";
import { mailService, otpRepository, userRepository } from "./repository.register.js";

export const sendOtpUseCase = new SendOtpUseCase<Otp,User>(otpRepository,userRepository,mailService)