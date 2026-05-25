import { UserTable } from "@/components/UserTable";
import { mockUsers, mockFeedback } from "@/lib/mock-data";

export default function UsersPage() {
  const feedbackCounts = mockFeedback.reduce<Record<string, number>>((acc, fb) => {
    acc[fb.userId] = (acc[fb.userId] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <UserTable users={mockUsers} feedbackCounts={feedbackCounts} />
    </div>
  );
}
