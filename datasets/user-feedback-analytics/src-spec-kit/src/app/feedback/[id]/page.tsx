"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Feedback, FeedbackStatus } from "@/types";
import { FeedbackStatusBadge } from "@/components/FeedbackStatusBadge";
import { FeedbackTypeBadge } from "@/components/FeedbackTypeBadge";

const transitions: Record<FeedbackStatus, { label: string; target: FeedbackStatus }[]> = {
  pending: [
    { label: "开始处理", target: "in_progress" },
    { label: "驳回", target: "dismissed" },
  ],
  in_progress: [
    { label: "标记解决", target: "resolved" },
    { label: "驳回", target: "dismissed" },
  ],
  resolved: [],
  dismissed: [{ label: "重新打开", target: "pending" }],
};

export default function FeedbackDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<FeedbackStatus | null>(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [fbRes, usersRes] = await Promise.all([
        fetch(`/api/feedback/${id}`),
        fetch("/api/users"),
      ]);
      const fbData = await fbRes.json();
      const usersData = await usersRes.json();

      if (fbData.feedback) {
        setFeedback(fbData.feedback);
        const user = usersData.users.find((u: { id: string }) => u.id === fbData.feedback.userId);
        setUserName(user?.name || fbData.feedback.userId);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleStatusChange = async (target: FeedbackStatus) => {
    if (!feedback) return;
    const prev = feedback;
    // Optimistic update
    setFeedback({ ...feedback, status: target, updatedAt: new Date().toISOString() });
    setUpdating(target);

    try {
      const res = await fetch(`/api/feedback/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: target }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setFeedback(data.feedback);
    } catch {
      // Rollback
      setFeedback(prev);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) return <div data-testid="loading">Loading...</div>;
  if (!feedback) return <div>Feedback not found</div>;

  const actions = transitions[feedback.status];

  return (
    <div>
      <button
        onClick={() => router.push("/feedback")}
        className="text-blue-600 hover:text-blue-800 mb-6 inline-flex items-center gap-1"
      >
        ← 返回列表
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{feedback.title}</h1>
          <FeedbackStatusBadge status={feedback.status} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
          <div>
            <span className="font-medium">类型：</span>
            <FeedbackTypeBadge type={feedback.type} />
          </div>
          <div>
            <span className="font-medium">提交用户：</span>
            <button
              onClick={() => router.push(`/users`)}
              className="text-blue-600 hover:underline"
            >
              {userName}
            </button>
          </div>
          <div>
            <span className="font-medium">创建时间：</span>
            {new Date(feedback.createdAt).toLocaleString()}
          </div>
          <div>
            <span className="font-medium">更新时间：</span>
            {new Date(feedback.updatedAt).toLocaleString()}
          </div>
        </div>

        <div className="border-t pt-4 mb-6">
          <h2 className="font-medium text-gray-900 mb-2">反馈内容</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{feedback.content}</p>
        </div>

        {actions.length > 0 && (
          <div className="border-t pt-4 flex gap-3">
            {actions.map(({ label, target }) => (
              <button
                key={target}
                onClick={() => handleStatusChange(target)}
                disabled={updating !== null}
                className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating === target ? "处理中..." : label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
