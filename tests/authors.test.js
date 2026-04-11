const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Authors = require("../models/authors");

describe("Authors API", () => {

    // =========================
    // GET ALL AUTHORS
    // =========================
    describe("GET /authors", () => {

        it("should return all authors", async () => {
            await Authors.create({
                firstName: "John",
                lastName: "Doe",
                dob: "1970-01-01"
            });

            const res = await request(app).get("/authors");

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBe(1);
        });

    });

    // =========================
    // GET SINGLE AUTHOR
    // =========================
    describe("GET /authors/:id", () => {

        it("should return a single author", async () => {
            const author = await Authors.create({
                firstName: "Single",
                lastName: "Author",
                dob: "1990-01-01"
            });

            const res = await request(app).get(`/authors/${author._id}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.firstName).toBe("Single");
        });

        it("should return 404 if author not found", async () => {
            const id = new mongoose.Types.ObjectId();

            const res = await request(app).get(`/authors/${id}`);

            expect(res.statusCode).toBe(404);
        });

        it("should return 500 for invalid ID", async () => {
            const res = await request(app).get("/authors/invalid-id");

            expect(res.statusCode).toBe(500);
        });

    });

});