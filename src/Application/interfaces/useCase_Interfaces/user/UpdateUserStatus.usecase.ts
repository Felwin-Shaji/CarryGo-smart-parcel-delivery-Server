export interface IUpdateUserStatusUseCase {
    execute(dto: { userId: string, isBlocked: boolean }): Promise<void>
}