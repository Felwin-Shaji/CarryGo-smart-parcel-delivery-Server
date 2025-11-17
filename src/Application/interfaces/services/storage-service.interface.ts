export interface IStorageService {
  upload(buffer: Buffer, folder: string): Promise<string>;
}
