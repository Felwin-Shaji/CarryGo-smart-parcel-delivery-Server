import { AddressResponseDTO } from "../../../../Dto/User/Booking.dto";

export interface IGetAddressesByPincodeUsecase {
    execute(userId:string,pincode:string):Promise<AddressResponseDTO[]>
}