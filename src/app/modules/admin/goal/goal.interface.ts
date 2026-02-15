

export interface IGoal extends Document {
    index: number;
    title: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}