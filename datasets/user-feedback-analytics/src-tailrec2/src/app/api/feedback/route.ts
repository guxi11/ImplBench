import { NextRequest, NextResponse } from "next/server";
import { mockFeedback } from "@/lib/mock-data";
import { FeedbackStatus, FeedbackType } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status") as FeedbackStatus | null;
  const type = searchParams.get("type") as FeedbackType | null;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.max(1, Number(searchParams.get("pageSize")) || 10);

  const filtered = mockFeedback.filter(
    (f) => (!status || f.status === status) && (!type || f.type === type)
  );

  const start = (page - 1) * pageSize;
  const feedback = filtered.slice(start, start + pageSize);

  return NextResponse.json({ feedback, total: filtered.length, page, pageSize });
}
