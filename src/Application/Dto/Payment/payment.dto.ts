export interface CreatePaymentOrderRequestDTO {
    bookingId: string;
    amount: number;
};


export interface CreatePaymentOrderResponseDTO {
  orderId: string;
  amount: number;
  currency: string;
}
