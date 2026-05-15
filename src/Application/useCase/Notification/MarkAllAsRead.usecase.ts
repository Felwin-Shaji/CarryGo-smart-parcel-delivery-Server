import { INotificationRepository } from "../../interfaces/repositories_interfaces/NotificationRepository_interfaces/INotificationRepository";
import { IMarkAllAsReadUseCase } from "../../interfaces/useCase_Interfaces/Notification/IMarkAllAsReadUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class MarkAllAsReadUseCase implements IMarkAllAsReadUseCase {
  constructor(
    @inject("INotificationRepository") private repo: INotificationRepository
  ) { }

  async execute(userId: string): Promise<void> {
    await this.repo.markAllAsRead(userId);
  }
}