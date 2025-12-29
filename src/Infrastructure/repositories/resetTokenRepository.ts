import { IResetTokenRepository } from "../../Application/interfaces/repositories_interfaces/authRepositories_Interfaces/resetToken.repository";
import { RefreshTokenModel } from "../database/models/refreshToken";
import { RefreshTokenRepository } from "./refreshTokenRepository";

export class ResetTokenRepository extends RefreshTokenRepository implements IResetTokenRepository {
}