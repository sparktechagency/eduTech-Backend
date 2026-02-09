import { model, Schema } from 'mongoose';
import { IRule, RuleModel } from './rule.interface';

const ruleSchema = new Schema<IRule, RuleModel>({
  content: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    enum: ['privacy', 'terms', 'about', 'faq'],
    required: false,
    select: 0,
  },
  question: { type: String, required: false },
  answer: { type: String, required: false },
});

export const Rule = model<IRule, RuleModel>('Rule', ruleSchema);
