const request = require("supertest");
const express = require("express");
const { authMiddleware } = require("../../src/middleware/auth.middleware");

describe("Auth Middleware", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.get("/protected", authMiddleware, (req, res) => {
      res.status(200).json({ message: "Access granted" });
    });
  });

  it("should block request without token", async () => {
    const res = await request(app).get("/protected");

    expect(res.status).toBe(401);
  });

  it("should allow request with token", async () => {
    const res = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer fake-token");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Access granted");
  });
});
