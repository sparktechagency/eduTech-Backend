import { z } from 'zod';

const createTimeValidationZodSchema = z.object({
    body: z.object({
        // mentorId: z.object({
        //     id: z.string({
        //         required_error: 'Mentor ID is required',
        //     }),
        // }),
        timeType: z.string({
            required_error: 'Time type is required',
        }),
        startTime: z.string({
            required_error: 'Start time is required',
        }),
        endTime: z.string({
            required_error: 'End time is required',
        }),
        requesting: z.string({
            required_error: 'Requesting field is required',
        }),
        comments: z.string().optional(),
    }),
});

const updateTimeValidationZodSchema = z.object({
    body: z.object({
        timeType: z.string().optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
        requesting: z.string().optional(),
        comments: z.string().optional(),
    }),
});

export const TimeTrackValidation = {
    createTimeValidationZodSchema,
    updateTimeValidationZodSchema,
};