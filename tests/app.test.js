const request = require("supertest");
const app = require("../src/app");

describe("API Endpoints Tests", () => {
  test("GET / - should return welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.status).toBe("Running");
  });

  test("GET /health - should return health status", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("healthy");
  });

  test("POST /api/calculate - addition", async () => {
    const response = await request(app)
      .post("/api/calculate")
      .send({ num1: 5, num2: 3, operation: "add" });
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(8);
  });

  test("POST /api/calculate - subtraction", async () => {
    const response = await request(app)
      .post("/api/calculate")
      .send({ num1: 10, num2: 4, operation: "subtract" });
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(6);
  });

  test("POST /api/calculate - multiplication", async () => {
    const response = await request(app)
      .post("/api/calculate")
      .send({ num1: 6, num2: 7, operation: "multiply" });
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(42);
  });

  test("POST /api/calculate - division", async () => {
    const response = await request(app)
      .post("/api/calculate")
      .send({ num1: 20, num2: 4, operation: "divide" });
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(5);
  });

  test("POST /api/calculate - invalid operation", async () => {
    const response = await request(app)
      .post("/api/calculate")
      .send({ num1: 5, num2: 3, operation: "invalid" });
    expect(response.statusCode).toBe(400);
  });
});
