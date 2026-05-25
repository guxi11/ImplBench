import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/users/[id]/feedback/route";
import { NextRequest } from "next/server";

const makeRequest = (userId: string) =>
  new NextRequest(new URL(`http://localhost:3000/api/users/${userId}/feedback`));

describe("GET /api/users/[id]/feedback", () => {
  it("returns feedback for user with submissions", async () => {
    const res = await GET(makeRequest("u-001"), {
      params: Promise.resolve({ id: "u-001" }),
    });
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(Array.isArray(data.feedback)).toBe(true);
    expect(data.feedback.length).toBeGreaterThan(0);
    data.feedback.forEach((fb: { userId: string }) => {
      expect(fb.userId).toBe("u-001");
    });
  });

  it("returns empty array for user with no feedback", async () => {
    const res = await GET(makeRequest("u-999"), {
      params: Promise.resolve({ id: "u-999" }),
    });
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.feedback).toEqual([]);
  });
});
