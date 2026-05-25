import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/feedback/route";
import { NextRequest } from "next/server";

const makeRequest = (params: Record<string, string> = {}) => {
  const url = new URL("http://localhost:3000/api/feedback");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return new NextRequest(url);
};

describe("GET /api/feedback", () => {
  it("returns complete list with correct structure", async () => {
    const res = await GET(makeRequest());
    const data = await res.json();

    expect(data).toHaveProperty("feedback");
    expect(data).toHaveProperty("total");
    expect(data).toHaveProperty("page");
    expect(data).toHaveProperty("pageSize");
    expect(Array.isArray(data.feedback)).toBe(true);
    expect(data.page).toBe(1);
    expect(data.pageSize).toBe(10);
  });

  it("filters by status", async () => {
    const res = await GET(makeRequest({ status: "pending" }));
    const data = await res.json();

    data.feedback.forEach((fb: { status: string }) => {
      expect(fb.status).toBe("pending");
    });
    expect(data.total).toBeGreaterThan(0);
  });

  it("filters by type", async () => {
    const res = await GET(makeRequest({ type: "bug" }));
    const data = await res.json();

    data.feedback.forEach((fb: { type: string }) => {
      expect(fb.type).toBe("bug");
    });
    expect(data.total).toBeGreaterThan(0);
  });

  it("paginates correctly", async () => {
    const res = await GET(makeRequest({ page: "1", pageSize: "3" }));
    const data = await res.json();

    expect(data.feedback.length).toBeLessThanOrEqual(3);
    expect(data.page).toBe(1);
    expect(data.pageSize).toBe(3);
    expect(data.total).toBeGreaterThan(3);
  });

  it("combines status and type filters", async () => {
    const res = await GET(makeRequest({ status: "pending", type: "bug" }));
    const data = await res.json();

    data.feedback.forEach((fb: { status: string; type: string }) => {
      expect(fb.status).toBe("pending");
      expect(fb.type).toBe("bug");
    });
  });
});
