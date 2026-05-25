import { NextRequest, NextResponse } from "next/server";
import { mockFeedback } from "@/lib/mock-data";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const feedback = mockFeedback.filter((f) => f.userId === id);
  return NextResponse.json({ feedback });
}
