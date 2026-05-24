"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Feedback, FeedbackStatus } from "@/types";

const statusColors: Record<FeedbackStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  dismissed: "bg-gray-100 text-gray-600",
};

const typeColors: Record<string, string> = {
  bug: "bg-red-100 text-red-700",
  feature_request: "bg-purple-100 text-purple-700",
  complaint: "bg-orange-100 text-orange-700",
  suggestion: "bg-cyan-100 text-cyan-700",
};

const statusTransitions: Record<FeedbackStatus, FeedbackStatus[]> = {
  pending: ["in_progress", "dismissed"],
  in_progress: ["resolved", "dismissed"],
  resolved: [],
  dismissed: ["pending"],
};

export default function FeedbackDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/feedback/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject("not found")))
      .then((data) => setFeedback(data.feedback))
      .catch(() => setError("Feedback not found"));
  }, [id]);

  const updateStatus = async (status: FeedbackStatus) => {
    const res = await fetch(`/api/feedback/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const data = await res.json();
      setFeedback(data.feedback);
    }
  };

  if (error) return <div className="text-red-600">{error}</div>;
  if (!feedback) return <div className="text-gray-500">Loading...</div>;

  const transitions = statusTransitions[feedback.status];

  return (
    <div className="max-w-2xl">
      <button onClick={() => router.push("/feedback")} className="text-blue-600 hover:underline text-sm mb-4 block">
        ← Back to Feedback
      </button>

      <h1 className="text-2xl font-bold mb-4">{feedback.title}</h1>

      <div className="flex gap-3 mb-6">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[feedback.type]}`}>
          {feedback.type.replace("_", " ")}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[feedback.status]}`}>
          {feedback.status.replace("_", " ")}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <p className="text-gray-700 whitespace-pre-wrap">{feedback.content}</p>
        <div className="mt-4 text-xs text-gray-400 space-y-1">
          <p>User: {feedback.userId}</p>
          <p>Created: {new Date(feedback.createdAt).toLocaleString()}</p>
          <p>Updated: {new Date(feedback.updatedAt).toLocaleString()}</p>
        </div>
      </div>

      {transitions.length > 0 && (
        <div className="flex gap-3">
          {transitions.map((s) => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
            >
              Mark as {s.replace("_", " ")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
