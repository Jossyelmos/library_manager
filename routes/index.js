const router = require("express").Router();

router.use("/", require("./swagger"));


router.use("/auth", require("./auth"));

//Author Routes
router.use("/authors", require("./authors"));
// Book Routes
router.use("/books", require("./books"));
router.use("/members", require("./members"));
router.use("/loans", require("./loans"));

module.exports = router;
