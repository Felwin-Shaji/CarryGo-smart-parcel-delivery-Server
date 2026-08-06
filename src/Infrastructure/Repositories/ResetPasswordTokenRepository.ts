import { IResetPasswordTokenRepository } from "../../Application/Interfaces/Repositories/Auth/IResetPasswordTokenRepository";
import { IResetPasswordTokenModel } from "../../Domain/Entities/IResetPasswordTokenModel";
import { ResetPasswordTokenModel } from "../Database/Models/ResetPasswordTokenModel";
import { BaseRepository } from "./BaseRepository";


export class ResetPasswordTokenRepository extends BaseRepository<IResetPasswordTokenModel> implements IResetPasswordTokenRepository {
        constructor() {
        super(ResetPasswordTokenModel)
    };

}