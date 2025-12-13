const request = require("supertest");

describe("POST /api/auth/register", () => {
  it("should register a new user", async () => {
    // app is intentionally not implemented yet (RED)
    const app = require("../../src/app");

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "test@mail.com",
        password: "Password123",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
  });
});
