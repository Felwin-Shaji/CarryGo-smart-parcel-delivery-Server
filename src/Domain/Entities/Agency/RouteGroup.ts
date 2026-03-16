export class RouteGroup {
    constructor(
        public id: string | null,
        public agencyId: string,

        public name: string,
        public description: string | null = null,

        public isActive: boolean = true,

        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) { }

}