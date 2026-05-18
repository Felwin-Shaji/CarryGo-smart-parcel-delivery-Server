import { inject, injectable } from "tsyringe";
import { IGoogleAuthService } from "../../interfaces/services_Interfaces/GoogleAuth/IGoogleAuthService";
import { IUserRepository } from "../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { IGenerateTokenUseCase } from "../../interfaces/useCase_Interfaces/AuthUsecase_Interfaces/GenerateToken.usecase";
import { IGoogleAuthUseCase } from "../../interfaces/useCase_Interfaces/AuthUsecase_Interfaces/IGoogleAuthUseCase";
import { Role } from "../../../Domain/Enums/Roles";
import { AppError } from "../../../Domain/utils/customError";
import { AUTH_MESSAGES } from "../../../Infrastructure/constants/messages/authMessages";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
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