export class Address {
  constructor(
    public id: string | null,
    public label: "Home" | "Office" | "Warehouse" | "Other",
    public formattedAddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: string,
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

    if (!/^[0-9]{6}$/.test(this.pincode)) {
      throw new Error("Invalid pincode");
    }
  }
}
