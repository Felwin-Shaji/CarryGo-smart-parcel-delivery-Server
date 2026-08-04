import { CreatePaymentOrderResponseDTO } from "../../../DTOs/Payment/payment.dto";

export interface ICreatePaymentOrderUsecase {
    execute(userId: string, bookingId: string): Promise<CreatePaymentOrderResponseDTO>;
} 