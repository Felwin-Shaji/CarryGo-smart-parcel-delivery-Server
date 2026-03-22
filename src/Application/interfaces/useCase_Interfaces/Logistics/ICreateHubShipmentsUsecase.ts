export interface ICreateHubShipmentsUsecase {
    execute(parcelRouteId: string): Promise<void>
}