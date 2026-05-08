export interface IMarkAllAsReadUseCase {
    execute(userId: string): Promise<void>;
}