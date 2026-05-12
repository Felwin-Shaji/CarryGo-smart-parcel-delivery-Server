import { BaseRoute } from "./base.route";
import { NotificationRoute } from "./NotificationRoutes/notification.route";
import { AddressRoute } from "./userRoutes/address.route";
import { BookingRoute } from "./userRoutes/booking.route";
import { TrackingRoute } from "./userRoutes/tracking.route";
import { TravelerRoute } from "./userRoutes/traveler.route";
import { UserProfileRoute } from "./userRoutes/userProfile.route";
import { WalletRoute } from "./userRoutes/wallet.route";

export class UserRoute extends BaseRoute {
    constructor() {
        super()
    }

    protected initializeRoutes(): void {
        this.router.use(new UserProfileRoute().router);
        this.router.use(new BookingRoute().router);
        this.router.use(new AddressRoute().router);
        this.router.use(new WalletRoute().router);
        this.router.use(new TravelerRoute().router);
        this.router.use(new TrackingRoute().router);
        this.router.use(new NotificationRoute().router);
    }
}