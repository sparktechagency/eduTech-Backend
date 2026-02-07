import { z } from 'zod';

const createEventValidationZodSchema = z.object({
    body: z.object({
     
         title: z.string({
            required_error: 'Title is required',
        }),
        description: z.string().optional(),
        date: z.string({
            required_error: 'Date is required',
        }),
        location: z.string().optional(),
        type: z.enum(['webinar', 'workshop', 'seminar', 'conference'], {
            required_error: 'Type is required and must be one of webinar, workshop, seminar, or conference',
        }),
        group: z.string({
            required_error: 'Group ID is required',
        }),
        targetUser: z.array(
            z.string()
                .regex(/^[0-9a-fA-F]{24}$/i)
                .refine(val => val.length === 24, { message: "ObjectId must be exactly 24 hex characters" })
        ).optional(),
    }),
});

const updateEventValidationZodSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        date: z.string().optional(),
        location: z.string().optional(),
        type: z.enum(['webinar', 'workshop', 'seminar', 'conference']).optional(),
        group: z.string().optional(),
    }),
});

export const EventValidation = {
    createEventValidationZodSchema,
    updateEventValidationZodSchema,
};