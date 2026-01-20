export interface IValidatePincodeUsecase {
    execute(fromPincode: string, toPincode: string):Promise<boolean>
}