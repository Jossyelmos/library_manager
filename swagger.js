// const swaggerAutogen = require("swagger-autogen")();

// const doc = {
//     info: {
//         title: "Library Manager API",
//         description: "API for managing library members, book inventory, authors, and loans."
//     },
//     host: process.env.RENDER_EXTERNAL_URL?.replace(/^https?:\/\//, "") || "localhost:3000",
//     schemes: process.env.RENDER_EXTERNAL_URL ? ["https"] : ["http"],
//     tags: [
//         {
//             name: "authors",
//             description: "Endpoints for managing authors"
//         },
//         {
//             name: "books",
//             description: "Endpoints for managing books"
//         }
//     ]
// };

// const outputFile = "./swagger.json";
// const endpointsFiles = ["./routes/index.js"];

// swaggerAutogen(outputFile, endpointsFiles, doc);


require('dotenv').config();

const swaggerAutogen = require('swagger-autogen')();

const isProduction = process.env.NODE_ENV === "production";

const doc = {
    info: {
        title: "Library Manager API",
        description: "API for managing library members, book inventory, authors, and loans."
    },
    host: process.env.BASE_URL || "localhost:3000",
    schemes: isProduction ? ["https"] : ["http"]
};

const outputFile = './swagger.json';
const endpointsFile = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFile, doc);