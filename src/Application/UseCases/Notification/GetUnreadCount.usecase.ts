import { INotificationRepository } from "../../Interfaces/Repositories/Notification/INotificationRepository";
import { IGetUnreadCountUseCase } from "../../Interfaces/UseCases/Notification/IGetUnreadCountUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetUnreadCountUseCase implements IGetUnreadCountUseCase {
    constructor(
        @inject("INotificationRepository") private repo: INotificationRepository
    ) { }

    async execute(userId: string): Promise<number> {
        return this.repo.getUnreadCount(userId);
    }
}