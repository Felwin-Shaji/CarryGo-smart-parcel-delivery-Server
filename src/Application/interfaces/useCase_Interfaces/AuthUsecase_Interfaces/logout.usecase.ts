export interface ILogoutUsecase {
  execute(refreshToken: string): Promise<void>;
}