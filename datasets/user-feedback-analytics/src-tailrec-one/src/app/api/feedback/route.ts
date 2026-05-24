import { NextRequest, NextResponse } from "next/server";
import { mockFeedback } from "@/lib/mock-data";
import { FeedbackStatus, FeedbackType } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status") as FeedbackStatus | null;
  const type = searchParams.get("type") as FeedbackType | null;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const pageSize = Math.max(1, parseInt(searchParams.get("pageSize") || "10"));

  const filtered = mockFeedback.filter(
    (fb) => (!status || fb.status === status) && (!type || fb.type === type)
  );

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const feedback = filtered.slice(start, start + pageSize);

  return NextResponse.json({ feedback, total, page, pageSize });
}
