export interface IReportGenerator<T> {
    generate(report: T): Promise<Buffer>;
}