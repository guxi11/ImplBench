"use client";

import { useRouter } from "next/navigation";
import { Feedback } from "@/types";
import { FeedbackStatusBadge } from "./FeedbackStatusBadge";
import { FeedbackTypeBadge } from "./FeedbackTypeBadge";

interface Props {
  feedback: Feedback[];
  userNames: Record<string, string>;
}

export function FeedbackTable({ feedback, userNames }: Props) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">标题</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">创建时间</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {feedback.map((fb) => (
            <tr
              key={fb.id}
              onClick={() => router.push(`/feedback/${fb.id}`)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{fb.title}</td>
              <td className="px-6 py-4"><FeedbackTypeBadge type={fb.type} /></td>
              <td className="px-6 py-4"><FeedbackStatusBadge status={fb.status} /></td>
              <td className="px-6 py-4 text-sm text-gray-500">{userNames[fb.userId] || fb.userId}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{new Date(fb.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
