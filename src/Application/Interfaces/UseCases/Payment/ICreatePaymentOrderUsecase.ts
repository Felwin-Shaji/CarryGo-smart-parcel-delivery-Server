import { CreatePaymentOrderResponseDTO } from "../../../DTOs/Payment/PaymentDTO";

export interface ICreatePaymentOrderUsecase {
    execute(userId: string, bookingId: string): Promise<CreatePaymentOrderResponseDTO>;
} 