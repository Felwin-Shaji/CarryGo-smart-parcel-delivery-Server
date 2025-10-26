export class User {
  constructor(
    public id: string | null,
    public name: string,
    public email: string,
    public mobile: string | null,
    public password: string | null,
    public googleId?: string | null,
    public authProvider?: "local" | "google",
    public kycStatus: string = "pending",
    public walletBalance: number = 0,
    public isBlocked: boolean = false,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  validateRegistration(): void {
    if (!this.name || this.name.length < 2) throw new Error('Invalid name');
  }
}
