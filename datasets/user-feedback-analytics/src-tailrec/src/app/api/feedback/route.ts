import { NextRequest, NextResponse } from "next/server";
import { mockFeedback } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const status = params.get("status");
  const type = params.get("type");
  const page = Math.max(1, parseInt(params.get("page") || "1", 10));
  const pageSize = Math.max(1, parseInt(params.get("pageSize") || "10", 10));

  const filtered = mockFeedback.filter(
    (fb) =>
      (!status || fb.status === status) && (!type || fb.type === type)
  );

  const total = filtered.length;
  const feedback = filtered.slice((page - 1) * pageSize, page * pageSize);

  return NextResponse.json({ feedback, total, page, pageSize });
}
