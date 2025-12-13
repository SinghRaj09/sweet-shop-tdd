const request = require("supertest");
const express = require("express");

describe("Auth Middleware", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.get("/protected", (req, res) => {
      res.status(200).json({ message: "Access granted" });
    });
  });

  it("should block request without token", async () => {
    const res = await request(app).get("/protected");

    expect(res.status).toBe(401);
  });
});