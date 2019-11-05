const request = require("supertest");
const knex = require("../db/knex");

const app = require("../index");

describe("Routes: ideas", () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe("GET /ideas", () => {
    test("Should return array of ideas", async () => {
      const res = await request(app).get("/ideas");
      expect(res.status).toBe(200);
      // expect(res.body.data).toBeDefined();
    });
  });

  describe("POST /ideas", () => {
    test("Should return single idea after insert", async () => {
      const data = { idea: "Test idea", creator: "Test creator" };
      const res = await request(app)
        .post("/ideas")
        .send(data);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(data);
    });

    test("Should return single idea after insert", async () => {
      const res = await request(app)
        .post("/ideas")
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
      console.dir(res.body);
    });
  });
});
