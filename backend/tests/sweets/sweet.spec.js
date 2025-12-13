const request = require("supertest");
const app = require("../../src/app");

const authHeader = {
  Authorization: "Bearer fake-token",
};

describe("Sweet CRUD APIs (Protected)", () => {

  it("should block creating sweet without auth", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .send({
        name: "Kaju Katli",
        price: 500,
      });

    expect(res.status).toBe(401);
  });

  it("should create sweet with auth", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set(authHeader)
      .send({
        name: "Kaju Katli",
        price: 500,
      });

    expect(res.status).toBe(201);
  });

  it("should get sweets with auth", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set(authHeader);

    expect(res.status).toBe(200);
  });

});
