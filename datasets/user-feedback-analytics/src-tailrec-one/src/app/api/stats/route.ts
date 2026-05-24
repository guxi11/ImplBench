import { NextResponse } from "next/server";
import { mockStats, mockFeedback } from "@/lib/mock-data";

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const stats = {
    ...mockStats,
    feedbackPending: mockFeedback.filter((fb) => fb.status === "pending").length,
    feedbackTotal: mockFeedback.length,
    feedbackResolvedToday: mockFeedback.filter(
      (fb) => fb.status === "resolved" && fb.updatedAt.slice(0, 10) === today
    ).length,
  };
  return NextResponse.json(stats);
}
