const request = require("supertest");
const app = require("../app"); // your express app

describe("User API", () => {

  it("should register a new user", async () => {
  const res = await request(app)
    .post("/users/register")
    .send({
      name: "Test User",
      email: `test${Date.now()}@example.com`, //  UNIQUE EMAIL
      password: "123456",
      role: "ADMIN"
    });

  console.log(res.body); // optional debug

  expect(res.statusCode).toBe(201);
});

});

it("should login user", async () => {
  const res = await request(app)
    .post("/users/login")
    .send({
      email: "test@example.com",
      password: "123456"
    });

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("token");
});

it("should get user profile (protected route)", async () => {
  const login = await request(app)
    .post("/users/login")
    .send({
      email: "test@example.com",
      password: "123456"
    });

  const token = login.body.token;

  const res = await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
});

it("should fetch records", async () => {
  const login = await request(app)
    .post("/users/login")
    .send({
      email: "test@example.com",
      password: "123456"
    });

  const token = login.body.token;

  const res = await request(app)
    .get("/records/all")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
});