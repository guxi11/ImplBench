"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/StatCard";
import { Stats } from "@/types";

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-gray-400 animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} icon="👥" />
        <StatCard title="Active Users" value={stats.activeUsers} icon="✅" />
        <StatCard title="New Today" value={stats.newUsersToday} icon="🆕" />
        <StatCard title="New This Week" value={stats.newUsersThisWeek} icon="📈" />
        <StatCard title="Pending Feedback" value={stats.feedbackPending} icon="⏳" />
        <StatCard title="Total Feedback" value={stats.feedbackTotal} icon="💬" />
      </div>
    </div>
  );
}
