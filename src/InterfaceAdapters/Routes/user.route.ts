import { BaseRoute } from "./base.route";
import { NotificationRoute } from "./Notification/notification.route";
import { AddressRoute } from "./User/address.route";
import { BookingRoute } from "./User/booking.route";
import { TrackingRoute } from "./User/tracking.route";
import { TravelerRoute } from "./User/traveler.route";
import { UserProfileRoute } from "./User/userProfile.route";
import { WalletRoute } from "./User/wallet.route";

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