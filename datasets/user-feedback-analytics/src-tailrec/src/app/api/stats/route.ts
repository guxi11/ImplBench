import { NextResponse } from "next/server";
import { mockStats, mockFeedback } from "@/lib/mock-data";

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);

  const feedbackPending = mockFeedback.filter((f) => f.status === "pending").length;
  const feedbackTotal = mockFeedback.length;
  const feedbackResolvedToday = mockFeedback.filter(
    (f) => f.status === "resolved" && f.updatedAt.slice(0, 10) === today
  ).length;

  return NextResponse.json({
    ...mockStats,
    feedbackPending,
    feedbackTotal,
    feedbackResolvedToday,
  });
}
