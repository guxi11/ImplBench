import { NextRequest, NextResponse } from "next/server";
import { mockFeedback } from "@/lib/mock-data";
import { FeedbackStatus, FeedbackType } from "@/types";

const validStatuses: FeedbackStatus[] = ["pending", "in_progress", "resolved", "dismissed"];
const validTypes: FeedbackType[] = ["bug", "feature_request", "complaint", "suggestion"];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status") as FeedbackStatus | null;
  const type = searchParams.get("type") as FeedbackType | null;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const pageSize = Math.max(1, parseInt(searchParams.get("pageSize") || "10", 10));

  const filtered = mockFeedback.filter((fb) => {
    if (status && validStatuses.includes(status) && fb.status !== status) return false;
    if (type && validTypes.includes(type) && fb.type !== type) return false;
    return true;
  });

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const feedback = filtered.slice(start, start + pageSize);

  return NextResponse.json({ feedback, total, page, pageSize });
}
