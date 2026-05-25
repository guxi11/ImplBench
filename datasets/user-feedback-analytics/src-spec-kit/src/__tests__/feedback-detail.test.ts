import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/feedback/[id]/route";
import { NextRequest } from "next/server";

const makeRequest = (id: string) =>
  new NextRequest(new URL(`http://localhost:3000/api/feedback/${id}`));

describe("GET /api/feedback/[id]", () => {
  it("returns feedback for valid id", async () => {
    const res = await GET(makeRequest("fb-001"), {
      params: Promise.resolve({ id: "fb-001" }),
    });
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.feedback).toBeDefined();
    expect(data.feedback.id).toBe("fb-001");
    expect(data.feedback).toHaveProperty("title");
    expect(data.feedback).toHaveProperty("content");
    expect(data.feedback).toHaveProperty("status");
    expect(data.feedback).toHaveProperty("type");
  });

  it("returns 404 for invalid id", async () => {
    const res = await GET(makeRequest("fb-999"), {
      params: Promise.resolve({ id: "fb-999" }),
    });
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.error).toBe("Feedback not found");
  });
});
