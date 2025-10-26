
import type { Otp } from "../../Application/Dto/otp.dto.js";
import type { User } from "../../Domain/Entities/User.js";
import { OtpModel } from "../database/models/OtpModel.js";
import { UserModel } from "../database/models/userModel.js";
import { OtpRepository } from "../repositories/otpRepository.js";
import { UserRepository } from "../repositories/userRepository.js";
import { MailService } from "../services/sendEmial.service.js";

export const otpRepository = new OtpRepository<Otp>(OtpModel)

export const mailService = new MailService()
export const userRepository = new UserRepository<User>(UserModel)