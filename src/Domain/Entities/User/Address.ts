export class Address {
  constructor(
    public label: "Home" | "Office" | "Warehouse" | "Other",
    public addressLine1: string,
    public addressLine2: string | null,
    public city: string,
    public state: string,
    public country: string,
    public pincode: string,
    public formattedAddress: string | null,
    public location: {
      lat: number;
      lng: number;
    },
    public isDefault: boolean = false,
    public isActive: boolean = true
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.addressLine1) {
      throw new Error("Address line 1 is required");
    }

    if (!/^[0-9]{6}$/.test(this.pincode)) {
      throw new Error("Invalid pincode");
    }
  }
}
