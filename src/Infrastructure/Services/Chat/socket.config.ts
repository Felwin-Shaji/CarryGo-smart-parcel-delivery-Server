import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { SocketService } from "./Socket.service";
import { container } from "tsyringe";
import { NotificationSocketService } from "../Notification/NotificationSocket.service";

export const initSocket = (server: HttpServer) => {

    const io = new Server(server, {
        cors: {
            origin: [
                "http://localhost:5173",
                "https://carry-go-smart-parcel-delivery-client-cafoyp5mn.vercel.app",
                "https://carry-go-smart-parcel-delivery-clie.vercel.app",

                //CLOUDFRONT_URL
                "https://d3sd8vqja88xcy.cloudfront.net/login"
            ],
            credentials: true,
        },
    });

    container.registerInstance("SocketIOServer", io);
    const socketService = container.resolve(SocketService);
    const notificationSocketService = container.resolve(NotificationSocketService);

    socketService.connect();
    notificationSocketService.connect();

    return io;
};