export interface ICheckTempHubStatusUseCase {
    execute(email: string): Promise<{
        exists: boolean;
        status?: string | undefined;
        tempHubId?: string | null | undefined;
        expiresAt?: Date | undefined;
    }>;
}
