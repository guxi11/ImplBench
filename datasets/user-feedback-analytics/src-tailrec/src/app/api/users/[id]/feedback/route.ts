import { NextResponse } from "next/server";
import { mockFeedback } from "@/lib/mock-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const feedback = mockFeedback.filter((fb) => fb.userId === id);
  return NextResponse.json({ feedback });
}
