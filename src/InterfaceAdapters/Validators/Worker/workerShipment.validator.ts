import { z } from "zod";

/*
*********************************** updateShipmentStatus
*/
export const updateShipmentStatusBodySchema = z
    .object({
        status: z.enum([
            "PENDING",
            "LOADING",
            "DISPATCHED",
            "ARRIVED",
            "COMPLETED",
            "CANCELLED",
        ]),
    })
    .strict();

export const updateShipmentStatusParamsSchema = z.object({
    id: z.string().min(1, "Shipment ID is required"),
});

export const updateShipmentStatusSchema = z.object({
    body: updateShipmentStatusBodySchema,
    params: updateShipmentStatusParamsSchema,
});

/*
*********************************** bulkUpdateParcels
*/
export const bulkUpdateParcelsBodySchema = z
    .object({
        parcelIds: z
            .array(z.string().min(1))
            .min(1, "At least one parcel is required"),

        status: z.enum([
            "PENDING",
            "LOADED",
            "IN_TRANSIT",
            "UNLOADED",
        ])
    })
    .strict()
    .superRefine((data, ctx) => {
        // 🔥 optional: prevent duplicates
        const unique = new Set(data.parcelIds);
        if (unique.size !== data.parcelIds.length) {
            ctx.addIssue({
                code: "custom",
                message: "Duplicate parcel IDs are not allowed",
                path: ["parcelIds"],
            });
        }
    });

export const bulkUpdateParcelsParamsSchema = z.object({
    id: z.string().min(1, "Shipment ID is required"),
});

export const bulkUpdateParcelsSchema = z.object({
    body: bulkUpdateParcelsBodySchema,
    params: bulkUpdateParcelsParamsSchema,
});