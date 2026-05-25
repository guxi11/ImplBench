import { FeedbackType, FeedbackStatus } from "@/types";

const statusColors: Record<FeedbackStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  "in-progress": "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  dismissed: "bg-gray-100 text-gray-600",
};

const typeColors: Record<FeedbackType, string> = {
  bug: "bg-red-100 text-red-700",
  feature: "bg-purple-100 text-purple-700",
  improvement: "bg-cyan-100 text-cyan-700",
  question: "bg-orange-100 text-orange-700",
};

interface FeedbackBadgeProps {
  type: "status" | "type";
  value: string;
}

export function FeedbackBadge({ type, value }: FeedbackBadgeProps) {
  const colors =
    type === "status"
      ? statusColors[value as FeedbackStatus] ?? "bg-gray-100 text-gray-600"
      : typeColors[value as FeedbackType] ?? "bg-gray-100 text-gray-600";

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors}`}>
      {value}
    </span>
  );
}
