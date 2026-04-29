import { IMessageSocketService } from "@/Application/interfaces/services_Interfaces/Chat/IMessageSocketService";
import { Message } from "@/Domain/Entities/Chat/Message";
import { Server, Socket } from "socket.io";
import { inject, injectable } from "tsyringe";

@injectable()
export class SocketService implements IMessageSocketService {

    constructor(
        @inject("SocketIOServer") private io: Server
    ) { }


    connect(): void {
        this.io.on("connection", (socket: Socket) => {
            const { token, userId } = socket.handshake.auth;

            console.log(token, userId, "1234567890");


            // Join chat room
            socket.on("join_chat", (chatId) => {
                console.log(chatId)
                socket.join(chatId);


                const rooms = this.io.sockets.adapter.rooms.get(chatId);
                console.log(rooms)

            });

            // Handle sending message
            socket.on("send_message", (data) => {
                const { chatId, message } = data;

                // Send to all users in that chat room
                this.io.to(chatId).emit("receive_message", message);
            });

            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id);
            });
        });
    }

    emitMessage(chatId: string, message: Message & { tempId: string }) {
        const rooms = this.io.sockets.adapter.rooms.get(chatId);
        this.io.to(chatId).emit("receive_message", message);
    }
}