const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Authors = require("../models/authors");

describe("Authors API", () => {

    // =========================
    // CREATE AUTHOR
    // =========================
    describe("POST /authors", () => {

        it("should create a new author", async () => {
            const res = await request(app)
                .post("/authors")
                .send({
                    firstName: "Jane",
                    lastName: "Smith",
                    dob: "1980-01-01",
                    nationality: "American"
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.firstName).toBe("Jane");
            expect(res.body._id).toBeDefined();
        });

        it("should fail if required fields are missing", async () => {
            const res = await request(app)
                .post("/authors")
                .send({
                    lastName: "Smith"
                });

            expect(res.statusCode).toBe(500);
            expect(res.body.error).toBeDefined();
        });

        it("should fail with empty body", async () => {
            const res = await request(app)
                .post("/authors")
                .send({});

            expect(res.statusCode).toBe(500);
        });

    });

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

    // =========================
    // UPDATE AUTHOR
    // =========================
    describe("PUT /authors/:id", () => {

        it("should update an author", async () => {
            const author = await Authors.create({
                firstName: "Old",
                lastName: "Name",
                dob: "1985-01-01"
            });

            const res = await request(app)
                .put(`/authors/${author._id}`)
                .send({
                    firstName: "New",
                    lastName: "Name",
                    dob: "1985-01-01"
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.firstName).toBe("New");
        });

        it("should return 404 if author to update is not found", async () => {
            const id = new mongoose.Types.ObjectId();

            const res = await request(app)
                .put(`/authors/${id}`)
                .send({
                    firstName: "Ghost",
                    lastName: "User",
                    dob: "2000-01-01"
                });

            expect(res.statusCode).toBe(404);
        });

    });

    // =========================
    // DELETE AUTHOR
    // =========================
    describe("DELETE /authors/:id", () => {

        it("should delete an author", async () => {
            const author = await Authors.create({
                firstName: "Delete",
                lastName: "Me",
                dob: "1995-01-01"
            });

            const res = await request(app)
                .delete(`/authors/${author._id}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.MSG).toBe("Author successfully deleted");
        });

        it("should return 404 if author to delete is not found", async () => {
            const id = new mongoose.Types.ObjectId();

            const res = await request(app)
                .delete(`/authors/${id}`);

            expect(res.statusCode).toBe(404);
        });

    });

});