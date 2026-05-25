"use client";

import { useEffect, useState } from "react";
import { UserTable } from "@/components/UserTable";
import { User, Feedback } from "@/types";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [feedbackCounts, setFeedbackCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/users").then((r) => r.json()),
      fetch("/api/feedback?pageSize=1000").then((r) => r.json()),
    ]).then(([usersData, feedbackData]) => {
      setUsers(usersData);
      const counts = (feedbackData.feedback as Feedback[]).reduce<Record<string, number>>(
        (acc, fb) => ({ ...acc, [fb.userId]: (acc[fb.userId] || 0) + 1 }),
        {}
      );
      setFeedbackCounts(counts);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-gray-400 animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <UserTable users={users} feedbackCounts={feedbackCounts} />
    </div>
  );
}
