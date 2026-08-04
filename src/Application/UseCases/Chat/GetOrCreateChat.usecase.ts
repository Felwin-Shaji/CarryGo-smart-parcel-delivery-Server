import { Chat } from "../../../Domain/Entities/Chat/Chat";
import { IChatRepository } from "../../Interfaces/Repositories/Chat/IChatRepository";
import { IGetOrCreateChatUseCase } from "../../Interfaces/UseCases/Chat/IGetOrCreateChatUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetOrCreateChatUseCase implements IGetOrCreateChatUseCase {
    constructor(
        @inject("IChatRepository") private _chatRepo: IChatRepository
    ) { }

    async execute(userIds: [string, string], bookingId: string): Promise<Chat> {
        let chat = await this._chatRepo.findByParticipants(userIds, bookingId);

        if (!chat) {
            chat = await this._chatRepo.create({
                participants: userIds,
                bookingId: bookingId
            });
        }

        return chat;
    }
}