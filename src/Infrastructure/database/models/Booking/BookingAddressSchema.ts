import { Schema } from "mongoose";
import { AddressLabelType } from "../../../Types/types";

export interface BookingAddressDocument {
    label: AddressLabelType;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    country: string;
    pincode: string;
    location: {
        lat: number;
        lng: number;
    };
}


export const BookingAddressSchema = new Schema<BookingAddressDocument>(
    {
        label: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: String,
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pincode: { type: String, required: true },
        location: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
    },
    { _id: false }
);
