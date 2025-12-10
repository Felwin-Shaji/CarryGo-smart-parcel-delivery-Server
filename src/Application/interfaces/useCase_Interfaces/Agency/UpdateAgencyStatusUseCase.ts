export interface IUpdateAgencyStatusUseCase {
    execute( agencyId: string, isBlocked: boolean ): Promise<void>
}