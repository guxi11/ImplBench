export type FeedbackType = 'bug' | 'feature_request' | 'complaint' | 'suggestion';
export type FeedbackStatus = 'pending' | 'in_progress' | 'resolved' | 'dismissed';

export interface Feedback {
  id: string;
  userId: string;
  type: FeedbackType;
  title: string;
  content: string;
  status: FeedbackStatus;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "active" | "inactive" | "suspended";
  registeredAt: string;
  lastActiveAt: string;
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
