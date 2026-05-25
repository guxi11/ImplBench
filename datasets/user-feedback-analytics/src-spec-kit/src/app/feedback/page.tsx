"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Feedback, FeedbackStatus, FeedbackType } from "@/types";
import { FeedbackTable } from "@/components/FeedbackTable";

const statusOptions: { value: string; label: string }[] = [
  { value: "", label: "All" },
  { value: "pending", label: "待处理" },
  { value: "in_progress", label: "处理中" },
  { value: "resolved", label: "已解决" },
  { value: "dismissed", label: "已驳回" },
];

const typeOptions: { value: string; label: string }[] = [
  { value: "", label: "All" },
  { value: "bug", label: "Bug" },
  { value: "feature_request", label: "功能建议" },
  { value: "complaint", label: "投诉" },
  { value: "suggestion", label: "建议" },
];

export default function FeedbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userNames, setUserNames] = useState<Record<string, string>>({});

  const status = (searchParams.get("status") || "") as FeedbackStatus | "";
  const type = (searchParams.get("type") || "") as FeedbackType | "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10;

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([k, v]) => {
        if (v) params.set(k, v);
        else params.delete(k);
      });
      router.replace(`/feedback?${params.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (status) params.set("status", status);
      if (type) params.set("type", type);
      params.set("page", String(page));
      params.set("pageSize", String(pageSize));

      const [fbRes, usersRes] = await Promise.all([
        fetch(`/api/feedback?${params.toString()}`),
        fetch("/api/users"),
      ]);
      const fbData = await fbRes.json();
      const usersData = await usersRes.json();

      setFeedback(fbData.feedback);
      setTotal(fbData.total);
      setUserNames(
        Object.fromEntries(usersData.users.map((u: { id: string; name: string }) => [u.id, u.name]))
      );
      setLoading(false);
    };
    fetchData();
  }, [status, type, page]);

  const totalPages = Math.ceil(total / pageSize);

  if (loading) return <div data-testid="loading">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Feedback</h1>

      <div className="flex gap-4 mb-6">
        <select
          value={type}
          onChange={(e) => updateParams({ type: e.target.value, page: "" })}
          className="rounded-md border-gray-300 shadow-sm px-3 py-2 bg-white border"
        >
          {typeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => updateParams({ status: e.target.value, page: "" })}
          className="rounded-md border-gray-300 shadow-sm px-3 py-2 bg-white border"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {feedback.length === 0 ? (
        <div data-testid="empty-state" className="text-center py-12 text-gray-500">
          No feedback found
        </div>
      ) : (
        <>
          <FeedbackTable feedback={feedback} userNames={userNames} />
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => updateParams({ page: String(page - 1) })}
              disabled={page <= 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              上一页
            </button>
            <span className="text-sm text-gray-700">
              第 {page} / {totalPages} 页
            </span>
            <button
              onClick={() => updateParams({ page: String(page + 1) })}
              disabled={page >= totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              下一页
            </button>
          </div>
        </>
      )}
    </div>
  );
}
