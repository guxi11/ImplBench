import Link from "next/link";
import { User } from "@/types";

interface UserTableProps {
  users: User[];
  feedbackCounts?: Record<string, number>;
}

const statusStyle: Record<User["status"], string> = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-600",
  suspended: "bg-red-100 text-red-700",
};

export function UserTable({ users, feedbackCounts = {} }: UserTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="text-left px-6 py-3 font-medium">Name</th>
            <th className="text-left px-6 py-3 font-medium">Email</th>
            <th className="text-left px-6 py-3 font-medium">Status</th>
            <th className="text-left px-6 py-3 font-medium">Feedback</th>
            <th className="text-left px-6 py-3 font-medium">Registered</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium">{user.name}</td>
              <td className="px-6 py-4 text-gray-500">{user.email}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[user.status]}`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <Link href={`/feedback?user=${user.id}`} className="text-blue-600 hover:underline">
                  {feedbackCounts[user.id] || 0}
                </Link>
              </td>
              <td className="px-6 py-4 text-gray-500">
                {new Date(user.registeredAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
