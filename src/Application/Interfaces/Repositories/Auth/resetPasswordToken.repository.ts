import { IResetPasswordTokenModel } from "../../../../Domain/Entities/token";
import { IBaseRepository } from "../base.repository";

export type IResetPasswordTokenRepository =
    IBaseRepository<IResetPasswordTokenModel>;