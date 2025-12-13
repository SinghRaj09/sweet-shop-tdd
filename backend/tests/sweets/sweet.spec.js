const request = require("supertest");
const app = require("../../src/app");

describe("Sweet CRUD APIs", () => {

  it("should create a new sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .send({
        name: "Kaju Katli",
        price: 500,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Kaju Katli");
  });

  it("should get all sweets", async () => {
    const res = await request(app).get("/api/sweets");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should delete a sweet by id", async () => {
    const createRes = await request(app)
      .post("/api/sweets")
      .send({
        name: "Laddu",
        price: 300,
      });

    const sweetId = createRes.body.id;

    const deleteRes = await request(app).delete(`/api/sweets/${sweetId}`);

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.message).toBe("Sweet deleted");
  });

});
