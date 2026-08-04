import { IResetPasswordTokenModel } from "../../../../Domain/Entities/IResetPasswordTokenModel";
import { IBaseRepository } from "../base.repository";

export type IResetPasswordTokenRepository =
    IBaseRepository<IResetPasswordTokenModel>;