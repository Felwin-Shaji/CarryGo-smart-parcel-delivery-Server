import type { IStorageService } from "../../../Application/interfaces/services_Interfaces/storage-service.interface";
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import dotenv from "dotenv";
import { STATUS } from "@/Infrastructure/constants/statusCodes";
import { AppError } from "@/Domain/utils/customError";
dotenv.config();


export class StorageService implements IStorageService {
    constructor() {
        const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

        if (!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_API_SECRET) {
            throw new AppError("Missing Cloudinary environment variables", STATUS.INTERNAL_SERVER_ERROR);
        }


        cloudinary.config({
            cloud_name: CLOUD_NAME,
            api_key: CLOUD_API_KEY,
            api_secret: CLOUD_API_SECRET,
        });
    };

    upload(buffer: Buffer, folder: string): Promise<string> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder },
                (
                    err: UploadApiErrorResponse | undefined,
                    result: UploadApiResponse | undefined
                ) => {
                    if (err) return reject(err);
                    resolve(result!.secure_url);
                }
            ).end(buffer);
        });
    }

}