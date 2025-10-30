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
  ) {};

  validateRegistration(): void {
    this.validateName();
    this.validateMobile();
    this.validateWalletBalance();
  }

  private validateName(): void {
    if (!this.name || this.name.trim().length < 2) {
      throw new Error("Name must be at least 2 characters long");
    }
  }

  private validateMobile(): void {
    if (this.authProvider === "local") {
      if (!this.mobile) throw new Error("Mobile number is required");

      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(this.mobile)) {
        throw new Error("Mobile number must be a valid 10-digit number");
      }
    }
  }

  private validateWalletBalance(): void {
    if (this.walletBalance < 0) {
      throw new Error("Wallet balance cannot be negative");
    }
  }
}
