export interface ICreateHubShipmentPickUpUsecase {
    execute(bookingId: string): Promise<void>
}