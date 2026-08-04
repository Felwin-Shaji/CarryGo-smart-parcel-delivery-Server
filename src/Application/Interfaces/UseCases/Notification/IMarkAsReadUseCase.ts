export interface IMarkAsReadUseCase {
    execute(notificationId: string): Promise<void>;
}