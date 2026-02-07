import { Schema, model } from "mongoose";
import { IOnboarding } from "./onboarding.interface";

const onboardingSchema = new Schema<IOnboarding>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    computerComfort: {
      type: String,
      required: [true, "Please select how comfortable you are with computers"],
    },
    hardestToLearn: [
      {
        type: String,
        required: true,
      },
    ],
    proudMoment: {
      type: String,
      required: [true, "Please share what you feel proud of"],
      trim: true,
    },
    interests: [
      {
        type: String,
        required: true,
      },
    ],
    successVision: {
      type: String,
      required: [true, "Please share your vision of success"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Onboarding = model<IOnboarding>("Onboarding", onboardingSchema);