export interface IConfirmBookingUseCase {
    /**
     * Confirms a booking and computes the parcel route plan.
     *
     * On success:
     *   - ParcelRoute created (status: PLANNED)
     *   - ParcelRouteLegs created (all status: PENDING, shipmentId: null)
     *   - Booking.logistics.parcelRouteId stamped
     *
     * @param bookingId  The booking to confirm
     */
    execute(bookingId: string): Promise<{ parcelRouteId: string }>;
}
 