import type { ClientSession, FilterQuery } from "mongoose";

export interface IBaseRepository<T> {
    find(filter: FilterQuery<T>, session?: ClientSession): Promise<T[]>;
    findById(filter: FilterQuery<T>, session?: ClientSession): Promise<T | null>;
    findOne(filter:FilterQuery<T> ,session?:ClientSession): Promise<T | null>;

    save(data:T,session?:ClientSession):Promise<T>;

    delete(filter:FilterQuery<T>, session?:ClientSession):Promise<T | null>;

    findOneAndUpdate(filter:FilterQuery<T>, value:object,session:ClientSession):Promise<object | null>;
};