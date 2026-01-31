import { z } from 'zod';

const createResourceZodicSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
        }),
        type: z.string({
            required_error: 'Resource type is required',
        }),
        Category: z.string({
            required_error: 'Category is required',
        }),
        link: z.string({
            required_error: 'Link is required',
        }),
    }),
});
const updateResourceZodicSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        type: z.string().optional(),
        Category: z.string().optional(),
        link: z.string().optional(),
    }),
});

export const LearningValidation = {
    createResourceZodicSchema,
    updateResourceZodicSchema,
};
