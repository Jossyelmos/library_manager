const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Members = require("../models/members");

describe("Members API", () => {

  // =========================
  // GET ALL MEMBERS
  // =========================
  describe("GET /members", () => {
    it("should return all members", async () => {
      await Members.create({
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        phone: "08012345678",
        password: "123456",
        role: "member"
      });

      const res = await request(app).get("/members");

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // =========================
  // GET SINGLE MEMBER
  // =========================
  describe("GET /members/:id", () => {

    it("should return a single member", async () => {
      const member = await Members.create({
        firstName: "Jane",
        lastName: "Doe",
        phone: "08012345678",
        email: "jane@test.com",
        password: "123456",
        role: "member"
      });

      const res = await request(app).get(`/members/${member._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe("jane@test.com");
    });

    it("should return 404 if member not found", async () => {
      const id = new mongoose.Types.ObjectId();

      const res = await request(app).get(`/members/${id}`);

      expect(res.statusCode).toBe(404);
    });

    it("should return 500 for invalid ID", async () => {
      const res = await request(app).get("/members/invalid-id");

      expect(res.statusCode).toBe(500);
    });

  });

});