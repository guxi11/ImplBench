import { StatCard } from "@/components/StatCard";
import { mockStats } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={mockStats.totalUsers} icon="👥" />
        <StatCard title="Active Users" value={mockStats.activeUsers} icon="✅" />
        <StatCard title="New Today" value={mockStats.newUsersToday} icon="🆕" />
        <StatCard title="New This Week" value={mockStats.newUsersThisWeek} icon="📈" />
        <StatCard title="Pending Feedback" value={mockStats.feedbackPending} icon="⏳" />
        <StatCard title="Total Feedback" value={mockStats.feedbackTotal} icon="💬" />
      </div>
    </div>
  );
}
