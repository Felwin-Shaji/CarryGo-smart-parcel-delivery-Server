export interface ILogoutUsecase {
  execute(refreshToken: string,userId:string): Promise<void>;
}