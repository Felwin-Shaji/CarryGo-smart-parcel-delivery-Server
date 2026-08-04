import { INotificationRepository } from "../../Interfaces/Repositories/Notification/INotificationRepository";
import { IMarkAllAsReadUseCase } from "../../Interfaces/UseCases/Notification/IMarkAllAsReadUseCase";
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