"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Feedback, FeedbackStatus, FeedbackType } from "@/types";

const statusColors: Record<FeedbackStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  dismissed: "bg-gray-100 text-gray-600",
};

const typeColors: Record<FeedbackType, string> = {
  bug: "bg-red-100 text-red-700",
  feature_request: "bg-purple-100 text-purple-700",
  complaint: "bg-orange-100 text-orange-700",
  suggestion: "bg-cyan-100 text-cyan-700",
};

type TransitionButton = { label: string; target: FeedbackStatus };

const transitions: Record<FeedbackStatus, TransitionButton[]> = {
  pending: [
    { label: "Start Processing", target: "in_progress" },
    { label: "Dismiss", target: "dismissed" },
  ],
  in_progress: [
    { label: "Resolve", target: "resolved" },
    { label: "Dismiss", target: "dismissed" },
  ],
  resolved: [],
  dismissed: [{ label: "Reopen", target: "pending" }],
};

export default function FeedbackDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<FeedbackStatus | null>(null);

  useEffect(() => {
    fetch(`/api/feedback/${id}`)
      .then((res) => res.json())
      .then((data) => setFeedback(data.feedback))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (target: FeedbackStatus) => {
    if (!feedback) return;
    const prev = feedback.status;
    setUpdating(target);
    // Optimistic update
    setFeedback({ ...feedback, status: target, updatedAt: new Date().toISOString() });

    try {
      const res = await fetch(`/api/feedback/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: target }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setFeedback(data.feedback);
    } catch {
      // Revert on error
      setFeedback((f) => (f ? { ...f, status: prev } : f));
    } finally {
      setUpdating(null);
    }
  };

  if (loading) return <p data-testid="loading">Loading...</p>;
  if (!feedback) return <p>Feedback not found</p>;

  const buttons = transitions[feedback.status];

  return (
    <div>
      <Link
        href="/feedback"
        className="text-sm text-blue-600 hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to Feedback
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold">{feedback.title}</h1>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[feedback.status]}`}>
          {feedback.status.replace("_", " ")}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[feedback.type]}`}>
          {feedback.type.replace("_", " ")}
        </span>
        <span>
          User:{" "}
          <Link href={`/users`} className="text-blue-600 hover:underline">
            {feedback.userId}
          </Link>
        </span>
        <span>Created: {new Date(feedback.createdAt).toLocaleDateString()}</span>
        <span>Updated: {new Date(feedback.updatedAt).toLocaleDateString()}</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <p className="text-gray-800 whitespace-pre-wrap">{feedback.content}</p>
      </div>

      {buttons.length > 0 && (
        <div className="flex gap-3">
          {buttons.map(({ label, target }) => (
            <button
              key={target}
              onClick={() => handleStatusChange(target)}
              disabled={updating !== null}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating === target ? "Updating..." : label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
