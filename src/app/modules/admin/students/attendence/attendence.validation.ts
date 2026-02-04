

import { z } from 'zod';
const attendenceZodSchema = {
    body: {
        date: z.string({
            required_error: 'Date is required',
        }),

        takenBy: z.string({
            required_error: 'Taken By (Admin ID) is required',
        }),
        records: z.array(
            z.object({
                studentId: z.string({
                    required_error: 'Student ID is required',
                }),
                status: z.enum(['present', 'absent'], {
                    required_error: 'Status is required and must be either "present" or "absent"',
                }),
            })
        ).nonempty('Records array cannot be empty'),
    },
};

export const AttendenceValidation = {
    attendenceZodSchema,
};