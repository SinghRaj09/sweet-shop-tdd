const request = require("supertest");
const app = require("../../src/app");

describe("POST /api/auth/login", () => {

  it("should login user with valid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@mail.com",
        password: "Password123",
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("should fail when email is missing", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        password: "Password123",
      });

    expect(res.status).toBe(400);
  });

  it("should fail when password is missing", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@mail.com",
      });

    expect(res.status).toBe(400);
  });

});
