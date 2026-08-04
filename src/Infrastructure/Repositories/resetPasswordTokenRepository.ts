import { IResetPasswordTokenRepository } from "../../Application/Interfaces/Repositories/Auth/resetPasswordToken.repository";
import { IResetPasswordTokenModel } from "../../Domain/Entities/IResetPasswordTokenModel";
import { ResetPasswordTokenModel } from "../Database/Models/resetPasswordToken";
import { BaseRepository } from "./baseRepositories";


export class ResetPasswordTokenRepository extends BaseRepository<IResetPasswordTokenModel> implements IResetPasswordTokenRepository {
        constructor() {
        super(ResetPasswordTokenModel)
    };

}