export type Goal = {
  goal: string;
  completed: boolean;
};

export type Post = {
  id: string;
  activities: string[];
  emotion: string;
  entry: string;
  goals: Goal[];
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

export type User = {
  email?: string;
  email_newsletter?: boolean;
  firstName?: string;
  lastName?: string;
  posts?: any;
};
