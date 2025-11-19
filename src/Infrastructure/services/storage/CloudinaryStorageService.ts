import type { IStorageService } from "../../../Application/interfaces/services_Interfaces/storage-service.interface.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();


export class StorageService implements IStorageService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME!,
            api_key: process.env.CLOUD_API_KEY!,
            api_secret: process.env.CLOUD_API_SECRET!,
        });
    };

    upload(buffer: Buffer, folder: string): Promise<string> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder },
                (err:any, result:any) => {
                    if (err) return reject(err);
                    resolve(result!.secure_url);
                }
            ).end(buffer);
        });
    }

}