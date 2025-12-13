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

it("should fail when sweet name is missing", async () => {
  const res = await request(app)
    .post("/api/sweets")
    .set({ Authorization: "Bearer fake-token" })
    .send({
      price: 400,
    });

  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty("error");
});

it("should fail when sweet price is missing", async () => {
  const res = await request(app)
    .post("/api/sweets")
    .set({ Authorization: "Bearer fake-token" })
    .send({
      name: "Rasgulla",
    });

  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty("error");
});

