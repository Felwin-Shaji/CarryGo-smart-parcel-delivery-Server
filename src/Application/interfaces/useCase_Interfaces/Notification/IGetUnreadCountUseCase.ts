export interface IGetUnreadCountUseCase {
    execute(userId: string): Promise<number>;
}