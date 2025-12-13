const request = require("supertest");
const app = require("../../src/app");

describe("POST /api/auth/register", () => {

  it("should register a new user with valid data", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "test@mail.com",
        password: "Password123",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
  });

  it("should fail when email is missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        password: "Password123",
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should fail when password is missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "test@mail.com",
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

});
