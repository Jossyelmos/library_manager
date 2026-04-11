const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Books = require("../models/books");

describe("Books API", () => {

    describe("GET /books", () => {
        it("should return all books", async () => {
            await Books.create({
                title: "Test Book",
                authorId: new mongoose.Types.ObjectId(),
                isbn: "123456",
                copiesOwned: 5,
                copiesAvailable: 5
            });

            const res = await request(app).get("/books");

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe("GET /books/:id", () => {
        it("should return a single book", async () => {
            const book = await Books.create({
                title: "Single Book",
                authorId: new mongoose.Types.ObjectId(),
                isbn: "123456",
                copiesOwned: 5,
                copiesAvailable: 5
            });

            const res = await request(app).get(`/books/${book._id}`);

            expect(res.statusCode).toBe(200);
        });

        it("should return 404 if book not found", async () => {
            const id = new mongoose.Types.ObjectId();
            const res = await request(app).get(`/books/${id}`);

            expect(res.statusCode).toBe(404);
        });

        it("should return 500 for invalid ID", async () => {
            const res = await request(app).get("/books/invalid-id");

            expect(res.statusCode).toBe(500);
        });
    });

});