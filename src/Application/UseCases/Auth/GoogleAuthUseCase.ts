import { inject, injectable } from "tsyringe";
import { IGoogleAuthService } from "../../Interfaces/Services/GoogleAuth/IGoogleAuthService";
import { IUserRepository } from "../../Interfaces/Repositories/User/user.repository";
import { IGenerateTokenUseCase } from "../../Interfaces/UseCases/Auth/GenerateToken.usecase";
import { IGoogleAuthUseCase } from "../../Interfaces/UseCases/Auth/IGoogleAuthUseCase";
import { Role } from "../../../Domain/Enums/Role";
import { AppError } from "../../../Domain/Utils/customError";
import { AUTH_MESSAGES } from "../../../Infrastructure/Constants/Messages/authMessages";
import { STATUS } from "../../../Infrastructure/Constants/statusCodes";
import { AuthMapper } from "../../Mappers/AuthMapper";


@injectable()
export class GoogleAuthUseCase implements IGoogleAuthUseCase {

    constructor(
        @inject("IGoogleAuthService") private _googleAuthService: IGoogleAuthService,
        @inject("IUserRepository") private _userRepository: IUserRepository,
        @inject("IGenerateTokenUseCase") private _generateTokenUseCase: IGenerateTokenUseCase
    ) { }

    async execute(credential: string) {


        const googleUser = await this._googleAuthService.verifyGoogleToken(credential);

        let user = await this._userRepository.findOne({ email: googleUser.email });
        if (!user) {
            const newGoogleUser = AuthMapper.toCreateGoogleUser(googleUser);

            user = await this._userRepository.save(newGoogleUser);
        }


        if (user.isBlocked) throw new AppError(AUTH_MESSAGES.USER_BLOCKED, STATUS.FORBIDDEN);


        const tokens =
            await this._generateTokenUseCase.execute(
                user.id!,
                user.email,
                user.role,
                user.tokenVersion
            );

        return {
            users: user,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
}