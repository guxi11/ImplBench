"use client";

import { useEffect, useState } from "react";
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

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<FeedbackStatus | "">("");
  const [typeFilter, setTypeFilter] = useState<FeedbackType | "">("");
  const pageSize = 10;

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    if (statusFilter) params.set("status", statusFilter);
    if (typeFilter) params.set("type", typeFilter);

    fetch(`/api/feedback?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setFeedback(data.feedback);
        setTotal(data.total);
      });
  }, [page, statusFilter, typeFilter]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Feedback</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value as FeedbackStatus | ""); setPage(1); }}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="dismissed">Dismissed</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value as FeedbackType | ""); setPage(1); }}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Types</option>
          <option value="bug">Bug</option>
          <option value="feature_request">Feature Request</option>
          <option value="complaint">Complaint</option>
          <option value="suggestion">Suggestion</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Title</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Type</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Status</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {feedback.map((fb) => (
              <tr key={fb.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <Link href={`/feedback/${fb.id}`} className="text-blue-600 hover:underline">
                    {fb.title}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[fb.type]}`}>
                    {fb.type.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[fb.status]}`}>
                    {fb.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(fb.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded border disabled:opacity-40"
          >
            Prev
          </button>
          <span className="px-3 py-1 text-sm text-gray-600">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
