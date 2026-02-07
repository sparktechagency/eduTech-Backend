import { z } from "zod";

const createOnboardingValidation = z.object({
  body: z.object({
    computerComfort: z.string({
      required_error: "Computer comfort level is required",
    }),
    hardestToLearn: z.array(z.string()).nonempty("Select at least one challenge"),
    proudMoment: z.string({
      required_error: "Proud moment is required",
    }),
    interests: z.array(z.string()).nonempty("Select at least one interest"),
    successVision: z.string({
      required_error: "Success vision is required",
    }),
  }),
});

export const OnboardingValidation = {
  createOnboardingValidation,
};