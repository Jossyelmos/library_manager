const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Loans = require("../models/loan");
const Members = require("../models/members");
const Books = require("../models/books");

describe("Loans API", () => {

  let member;
  let book;

  beforeEach(async () => {
    member = await Members.create({
      firstName: "Loan",
      lastName: "User",
      phone: "08012345678",
      email: "loan@test.com",
      password: "123456",
      role: "member"
    });

    book = await Books.create({
      title: "Test Book",
      authorId: new mongoose.Types.ObjectId(),
      isbn: "123456789",
      copiesOwned: 5,
      copiesAvailable: 5
    });
  });

  // =========================
  // GET ALL LOANS
  // =========================
  describe("GET /loans", () => {
    it("should return all loans", async () => {
      await Loans.create({
        memberId: member._id,
        bookId: book._id,
        dueDate: new Date()
      });

      const res = await request(app).get("/loans");

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // =========================
  // GET SINGLE LOAN
  // =========================
  describe("GET /loans/:id", () => {

    it("should return a single loan", async () => {
      const loan = await Loans.create({
        memberId: member._id,
        bookId: book._id,
        dueDate: new Date()
      });

      const res = await request(app).get(`/loans/${loan._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBeDefined();
    });

    it("should return 404 if loan not found", async () => {
      const id = new mongoose.Types.ObjectId();

      const res = await request(app).get(`/loans/${id}`);

      expect(res.statusCode).toBe(404);
    });

    it("should return 500 for invalid ID", async () => {
      const res = await request(app).get("/loans/invalid-id");

      expect(res.statusCode).toBe(500);
    });

  });

});