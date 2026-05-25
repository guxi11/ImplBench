export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "active" | "inactive" | "suspended";
  registeredAt: string;
  lastActiveAt: string;
}

export type FeedbackType = "bug" | "feature" | "improvement" | "question";

export type FeedbackStatus = "pending" | "in-progress" | "resolved" | "dismissed";

export interface Feedback {
  id: string;
  userId: string;
  type: FeedbackType;
  status: FeedbackStatus;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Stats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  feedbackPending: number;
  feedbackTotal: number;
  feedbackResolvedToday: number;
}
