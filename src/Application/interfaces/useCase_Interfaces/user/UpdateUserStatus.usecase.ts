export interface IUpdateUserStatusUseCase {
    execute(userId: string, isBlocked: boolean ): Promise<void>
}