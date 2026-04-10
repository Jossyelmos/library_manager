const app = require("./app");
const connectDB = require("./database/db");

const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => {
    console.log(`Web server is listening at http://localhost:${port}`);
});