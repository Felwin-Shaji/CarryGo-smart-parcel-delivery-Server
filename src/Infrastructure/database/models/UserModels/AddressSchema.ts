import { Types } from "mongoose";
import { Schema } from "mongoose";

export const AddressSchema = new Schema(
    {
        label: { type: String, enum: ["Home", "Office", "Warehouse", "Other"], default: "Home" },

        addressLine1: { type: String, required: true, trim: true },
        addressLine2: { type: String, trim: true },

        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        country: { type: String, default: "India", trim: true },
        pincode: { type: String, required: true, match: /^[0-9]{6}$/ },

        formattedAddress: { type: String, trim: true },

        location: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },

        rawAddress: { type: Schema.Types.Mixed, },
        isDefault: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true, },
    },
    {
        _id: true,
        timestamps: true,
    }
);


export type AddressDBResult = {
  _id: Types.ObjectId;
  label: "Home" | "Office" | "Warehouse" | "Other";
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  country: string;
  pincode: string;
  formattedAddress?: string | null;
  location: {
    lat: number;
    lng: number;
  };
  isDefault: boolean;
  isActive: boolean;
};

