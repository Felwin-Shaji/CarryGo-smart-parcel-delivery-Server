import { CreatePaymentOrderResponseDTO } from "../../../Dto/Payment/payment.dto";

export interface ICreatePaymentOrderUsecase {
    execute(userId: string, bookingId: string): Promise<CreatePaymentOrderResponseDTO>;
} 