import { z } from 'zod';

const createWoopsZodicSchema = z.object({
    body: z.object({
        wish: z.object({
            // mainData: z.string({ required_error: "Wish main data is required" }),
            detail: z.string({ required_error: "Wish detail is required" }),
            // summary: z.string({ required_error: "Wish summary is required" }),
        }),
        outcome: z.object({
            // mainData: z.string({ required_error: "Outcome main data is required" }),
            detail: z.string({ required_error: "Outcome detail is required" }),
            // summary: z.string({ required_error: "Outcome summary is required" }),
        }),
        obstacle: z.object({
            // mainData: z.string({ required_error: "Obstacle main data is required" }),
            detail: z.string({ required_error: "Obstacle detail is required" }),
            // summary: z.string({ required_error: "Obstacle summary is required" }),
        }),
        plan: z.object({
            // mainData: z.string({ required_error: "Plan main data is required" }),
            detail: z.string({ required_error: "Plan detail is required" }),
            // summary: z.string({ required_error: "Plan summary is required" }),
        }),
    }),
});


const updateWoopsZodicSchema = z.object({
    body: z.object({
        wish: z.object({
            // mainData: z.string().optional(),
            detail: z.string().optional(),
            // summary: z.string().optional(),
        }).optional(),
        outcome: z.object({
            // mainData: z.string().optional(),
            detail: z.string().optional(),
            // summary: z.string().optional(),
        }).optional(),
        obstacle: z.object({
            // mainData: z.string().optional(),
            detail: z.string().optional(),
            // summary: z.string().optional(),
        }).optional(),
        plan: z.object({
            // mainData: z.string().optional(),
            detail: z.string().optional(),
            // summary: z.string().optional(),
        }).optional(),
    }),
});

export const WoopValidation = {
    createWoopsZodicSchema,
    updateWoopsZodicSchema,
};