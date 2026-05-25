import { NextRequest, NextResponse } from "next/server";
import { mockFeedback } from "@/lib/mock-data";
import { FeedbackStatus } from "@/types";

const validStatuses: FeedbackStatus[] = ["pending", "in_progress", "resolved", "dismissed"];

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const feedback = mockFeedback.find((fb) => fb.id === id);
  if (!feedback) {
    return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
  }
  return NextResponse.json({ feedback });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const idx = mockFeedback.findIndex((fb) => fb.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
  }

  const body = await request.json();
  if (!body.status || !validStatuses.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  mockFeedback[idx] = {
    ...mockFeedback[idx],
    status: body.status,
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json({ feedback: mockFeedback[idx] });
}
