"use client";

import { FeedbackType } from "@/types";

const typeConfig: Record<FeedbackType, { label: string; className: string }> = {
  bug: { label: "Bug", className: "bg-red-100 text-red-800" },
  feature_request: { label: "功能建议", className: "bg-purple-100 text-purple-800" },
  complaint: { label: "投诉", className: "bg-orange-100 text-orange-800" },
  suggestion: { label: "建议", className: "bg-teal-100 text-teal-800" },
};

export function FeedbackTypeBadge({ type }: { type: FeedbackType }) {
  const { label, className } = typeConfig[type];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
