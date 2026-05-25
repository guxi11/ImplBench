import { describe, it, expect } from "vitest";
import { PATCH } from "@/app/api/feedback/[id]/route";
import { NextRequest } from "next/server";

const makePatchRequest = (id: string, body: object) =>
  new NextRequest(new URL(`http://localhost:3000/api/feedback/${id}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

describe("PATCH /api/feedback/[id]", () => {
  it("updates status and returns updated feedback", async () => {
    const res = await PATCH(makePatchRequest("fb-001", { status: "in_progress" }), {
      params: Promise.resolve({ id: "fb-001" }),
    });
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.feedback.status).toBe("in_progress");
    expect(data.feedback.id).toBe("fb-001");
  });

  it("updates updatedAt timestamp", async () => {
    const before = new Date().toISOString();
    const res = await PATCH(makePatchRequest("fb-006", { status: "in_progress" }), {
      params: Promise.resolve({ id: "fb-006" }),
    });
    const data = await res.json();

    expect(new Date(data.feedback.updatedAt).getTime()).toBeGreaterThanOrEqual(
      new Date(before).getTime() - 1000
    );
  });

  it("returns 404 for invalid id", async () => {
    const res = await PATCH(makePatchRequest("fb-999", { status: "resolved" }), {
      params: Promise.resolve({ id: "fb-999" }),
    });
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.error).toBe("Feedback not found");
  });

  it("returns 400 for invalid status", async () => {
    const res = await PATCH(makePatchRequest("fb-001", { status: "invalid_status" }), {
      params: Promise.resolve({ id: "fb-001" }),
    });
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Invalid status");
  });
});
