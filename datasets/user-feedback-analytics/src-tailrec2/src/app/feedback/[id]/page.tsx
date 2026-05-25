"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Feedback } from "@/types";
import { FeedbackBadge } from "@/components/FeedbackBadge";
import { mockUsers } from "@/lib/mock-data";

type StatusTransition = { label: string; next: Feedback["status"] };

const transitions: Record<Feedback["status"], StatusTransition[]> = {
  pending: [
    { label: "Start Processing", next: "in-progress" },
    { label: "Dismiss", next: "dismissed" },
  ],
  "in-progress": [
    { label: "Resolve", next: "resolved" },
    { label: "Dismiss", next: "dismissed" },
  ],
  resolved: [],
  dismissed: [{ label: "Reopen", next: "pending" }],
};

export default function FeedbackDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/feedback/${id}`)
      .then((r) => r.json())
      .then((data) => setFeedback(data.feedback))
      .finally(() => setLoading(false));
  }, [id]);

  const updateStatus = async (next: Feedback["status"]) => {
    if (!feedback) return;
    const prev = feedback.status;
    setActionLoading(next);
    // optimistic update
    setFeedback({ ...feedback, status: next, updatedAt: new Date().toISOString() });

    try {
      const res = await fetch(`/api/feedback/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setFeedback(data.feedback);
    } catch {
      // rollback
      setFeedback((f) => (f ? { ...f, status: prev } : f));
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <p data-testid="loading">Loading...</p>;
  if (!feedback) return <p>Feedback not found</p>;

  const user = mockUsers.find((u) => u.id === feedback.userId);
  const actions = transitions[feedback.status];

  return (
    <div className="max-w-3xl">
      <Link
        href="/feedback"
        className="text-sm text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Feedback
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold">{feedback.title}</h1>
        <FeedbackBadge type="status" value={feedback.status} />
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
        <span>
          Type: <FeedbackBadge type="type" value={feedback.type} />
        </span>
        {user && (
          <span>
            User:{" "}
            <Link href="/users" className="text-blue-600 hover:underline">
              {user.name}
            </Link>
          </span>
        )}
        <span>Created: {new Date(feedback.createdAt).toLocaleString()}</span>
        <span>Updated: {new Date(feedback.updatedAt).toLocaleString()}</span>
      </div>

      {/* Content */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="text-gray-800 whitespace-pre-wrap">{feedback.description}</p>
      </div>

      {/* Actions */}
      {actions.length > 0 && (
        <div className="flex gap-3">
          {actions.map(({ label, next }) => (
            <button
              key={next}
              onClick={() => updateStatus(next)}
              disabled={actionLoading !== null}
              className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {actionLoading === next ? "..." : label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
