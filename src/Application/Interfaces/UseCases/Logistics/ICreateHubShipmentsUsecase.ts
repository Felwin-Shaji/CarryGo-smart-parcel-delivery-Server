export interface ICreateHubShipmentsUsecase {
    execute(parcelRouteId: string,bookingId: string): Promise<void>
}