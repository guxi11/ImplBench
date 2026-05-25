"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Feedback } from "@/types";
import { FeedbackBadge } from "@/components/FeedbackBadge";

export default function FeedbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") || "";
  const type = searchParams.get("type") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (type) params.set("type", type);
    params.set("page", String(page));

    setLoading(true);
    fetch(`/api/feedback?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setFeedback(data.feedback);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  }, [status, type, page]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    router.replace(`/feedback?${params}`);
  };

  const totalPages = Math.ceil(total / 10);

  if (loading) return <p data-testid="loading">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Feedback</h1>

      {/* Filter bar */}
      <div className="flex gap-4 mb-4">
        <select
          value={type}
          onChange={(e) => updateFilter("type", e.target.value)}
          className="border rounded px-3 py-1.5 text-sm"
        >
          <option value="">All Types</option>
          <option value="bug">Bug</option>
          <option value="feature">Feature</option>
          <option value="improvement">Improvement</option>
          <option value="question">Question</option>
        </select>
        <select
          value={status}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="border rounded px-3 py-1.5 text-sm"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="dismissed">Dismissed</option>
        </select>
      </div>

      {/* Table or empty */}
      {feedback.length === 0 ? (
        <p data-testid="empty-state">No feedback found</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-sm text-gray-500">
              <th className="pb-2 font-medium">Title</th>
              <th className="pb-2 font-medium">Type</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">User</th>
              <th className="pb-2 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((fb) => (
              <tr
                key={fb.id}
                onClick={() => router.push(`/feedback/${fb.id}`)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="py-3">{fb.title}</td>
                <td className="py-3">
                  <FeedbackBadge type="type" value={fb.type} />
                </td>
                <td className="py-3">
                  <FeedbackBadge type="status" value={fb.status} />
                </td>
                <td className="py-3 text-sm text-gray-600">{fb.userId}</td>
                <td className="py-3 text-sm text-gray-600">
                  {new Date(fb.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center gap-4 mt-4">
          <button
            disabled={page <= 1}
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", String(page - 1));
              router.replace(`/feedback?${params}`);
            }}
            className="px-3 py-1 border rounded text-sm disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", String(page + 1));
              router.replace(`/feedback?${params}`);
            }}
            className="px-3 py-1 border rounded text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
