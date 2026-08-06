export class EmailVo {
    constructor(private readonly email: string) { }

    static create(email: string) {
        if (!this.validate(email)) {
            throw new Error("Invalid email format")
        };
        return new EmailVo(email);
    };

    private static validate(value: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }

    public get value(): string {
        return this.email;
    }

    public equals(other: EmailVo): boolean {
        return this.value === other.value;
    }
}