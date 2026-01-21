import { CreatePaymentOrderRequestDTO, CreatePaymentOrderResponseDTO } from "../../../Dto/Payment/payment.dto";

export interface ICreatePaymentOrderUsecase {
    execute(payload: CreatePaymentOrderRequestDTO): Promise<CreatePaymentOrderResponseDTO>;
} 