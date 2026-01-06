export type ParcelSize = "SMALL" | "MEDIUM" | "LARGE" | "XLARGE";

export const PARCEL_SIZE: Record<ParcelSize, {
  label: string;
  maxDimensionsCm: string;
  volumetricWeightKg: number;
}> = {
  SMALL: {
    label: "Small",
    maxDimensionsCm: "25 × 20 × 10",
    volumetricWeightKg: 1,
  },
  MEDIUM: {
    label: "Medium",
    maxDimensionsCm: "40 × 30 × 20",
    volumetricWeightKg: 5,
  },
  LARGE: {
    label: "Large",
    maxDimensionsCm: "60 × 50 × 40",
    volumetricWeightKg: 15,
  },
  XLARGE: {
    label: "Extra Large",
    maxDimensionsCm: "100 × 60 × 60",
    volumetricWeightKg: 30,
  },
};