"use client";

import { FeedbackStatus } from "@/types";

const statusConfig: Record<FeedbackStatus, { label: string; className: string }> = {
  pending: { label: "待处理", className: "bg-yellow-100 text-yellow-800" },
  in_progress: { label: "处理中", className: "bg-blue-100 text-blue-800" },
  resolved: { label: "已解决", className: "bg-green-100 text-green-800" },
  dismissed: { label: "已驳回", className: "bg-gray-100 text-gray-800" },
};

export function FeedbackStatusBadge({ status }: { status: FeedbackStatus }) {
  const { label, className } = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
