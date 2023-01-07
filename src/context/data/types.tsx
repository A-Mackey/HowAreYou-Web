export type Goal = {
  goal: string;
  completed: boolean;
};

export type Post = {
  activities: string[];
  emotion: string;
  entry: string;
  goals: Goal[];
  day: number;
  month: number;
  year: number;
  timestamp: number;
};
