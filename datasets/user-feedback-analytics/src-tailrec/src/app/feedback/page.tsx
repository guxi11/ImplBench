"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Feedback, FeedbackType, FeedbackStatus } from "@/types";

const typeColors: Record<FeedbackType, string> = {
  bug: "bg-red-100 text-red-700",
  feature_request: "bg-purple-100 text-purple-700",
  complaint: "bg-orange-100 text-orange-700",
  suggestion: "bg-cyan-100 text-cyan-700",
};

const statusColors: Record<FeedbackStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  dismissed: "bg-gray-100 text-gray-600",
};

function FeedbackList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const type = searchParams.get("type") || "";
  const status = searchParams.get("status") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const pageSize = 10;
  const totalPages = Math.ceil(total / pageSize);

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([k, v]) => {
        v ? params.set(k, v) : params.delete(k);
      });
      router.replace(`/feedback?${params.toString()}`);
    },
    [searchParams, router]
  );

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (status) params.set("status", status);
    params.set("page", String(page));

    fetch(`/api/feedback?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedback(data.feedback);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  }, [type, status, page]);

  const handleFilterChange = (key: string, value: string) => {
    updateParams({ [key]: value, page: "1" });
  };

  if (loading) return <p data-testid="loading">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Feedback</h1>

      <div className="flex gap-4 mb-6">
        <select
          value={type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Types</option>
          <option value="bug">Bug</option>
          <option value="feature_request">Feature Request</option>
          <option value="complaint">Complaint</option>
          <option value="suggestion">Suggestion</option>
        </select>

        <select
          value={status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="dismissed">Dismissed</option>
        </select>
      </div>

      {feedback.length === 0 ? (
        <p data-testid="empty-state">No feedback found</p>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">User</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Created</th>
                </tr>
              </thead>
              <tbody>
                {feedback.map((fb) => (
                  <tr
                    key={fb.id}
                    onClick={() => router.push(`/feedback/${fb.id}`)}
                    className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-3">{fb.title}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[fb.type]}`}>
                        {fb.type.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[fb.status]}`}>
                        {fb.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{fb.userId}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(fb.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => updateParams({ page: String(page - 1) })}
              disabled={page <= 1}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => updateParams({ page: String(page + 1) })}
              disabled={page >= totalPages}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={<p data-testid="loading">Loading...</p>}>
      <FeedbackList />
    </Suspense>
  );
}
