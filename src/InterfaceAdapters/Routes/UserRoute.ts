import { BaseRoute } from "./BaseRoute";
import { NotificationRoute } from "./Notification/NotificationRoute";
import { AddressRoute } from "./User/AddressRoute";
import { BookingRoute } from "./User/BookingRoute";
import { TrackingRoute } from "./User/TrackingRoute";
import { TravelerRoute } from "./User/TravelerRoute";
import { UserProfileRoute } from "./User/UserProfileRoute";
import { WalletRoute } from "./User/WalletRoute";

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