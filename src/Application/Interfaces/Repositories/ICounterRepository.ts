export interface ICounterRepository {
    increment(key: string): Promise<number>;
}