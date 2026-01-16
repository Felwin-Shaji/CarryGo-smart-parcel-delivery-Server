import { IResetPasswordTokenModel } from "../../../../Domain/Entities/token";
import { IBaseRepository } from "../base.repository";

export interface IResetPasswordTokenRepository extends IBaseRepository<IResetPasswordTokenModel> {
}