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
}
