export interface IUpdateAgencyStatusUseCase {
    execute(dto: { userId: string, isBlocked: boolean }): Promise<void>
}