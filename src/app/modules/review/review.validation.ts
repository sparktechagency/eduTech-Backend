import { z } from "zod"

const reviewZodSchema = z.object({
    body: z.object({
        PROVIDER: z.string({ required_error: 'PROVIDER is required' }),
        service: z.string({ required_error: 'Service is required' }),
        rating: z.number({ required_error: 'Rating is required' }),
        comment: z.string({ required_error: 'Comment is required' }),
    })  
})

export const ReviewValidation = {reviewZodSchema}