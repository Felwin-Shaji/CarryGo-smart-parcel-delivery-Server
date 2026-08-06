import { IResetPasswordTokenModel } from "../../../../Domain/Entities/IResetPasswordTokenModel";
import { IBaseRepository } from "../IBaseRepository";

export type IResetPasswordTokenRepository =
    IBaseRepository<IResetPasswordTokenModel>;