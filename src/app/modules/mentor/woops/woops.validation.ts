import { z } from 'zod';

const createWoopsZodicSchema = z.object({
    body: z.object({
        goalIndex: z.number({
            required_error: 'Goal index is required',
        }),
        goalTitle: z.string({
            required_error: 'Goal title is required',
        }),
        goalDescription: z.string({
            required_error: 'Goal description is required',
        }),
        wish: z.string({
            required_error: 'Wish is required',
        }),
        outcome: z.string({
            required_error: 'Outcome is required',
        }),
        obstacle: z.string({
            required_error: 'Obstacle is required',
        }),
        plan: z.string({
            required_error: 'Plan is required',
        }),
    }),
});
const updateWoopsZodicSchema = z.object({
    body: z.object({
        goalIndex: z.number().optional(),
        goalTitle: z.string().optional(),
        Category: z.string().optional(),
        link: z.string().optional(),
    }),
});

export const WoopValidation = {
    createWoopsZodicSchema,
    updateWoopsZodicSchema,
};