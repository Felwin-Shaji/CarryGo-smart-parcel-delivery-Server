import { IResetPasswordTokenRepository } from "../../Application/Interfaces/Repositories/Auth/resetPasswordToken.repository";
import { IResetPasswordTokenModel } from "../../Domain/Entities/token";
import { ResetPasswordTokenModel } from "../database/models/resetPasswordToken";
import { BaseRepository } from "./baseRepositories";


export class ResetPasswordTokenRepository extends BaseRepository<IResetPasswordTokenModel> implements IResetPasswordTokenRepository {
        constructor() {
        super(ResetPasswordTokenModel)
    };

}