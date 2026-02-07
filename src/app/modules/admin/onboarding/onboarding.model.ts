import { Schema, model } from 'mongoose';
import { IOnboarding } from './onboarding.interface';

const onboardingSchema = new Schema<IOnboarding>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
  },
  {
    strict: false, 
    timestamps: true,
  }
);

export const Onboarding = model<IOnboarding>('Onboarding', onboardingSchema);