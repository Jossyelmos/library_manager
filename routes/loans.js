const router = require("express").Router();
const auth = require("../middleware/auth");
const validateLoan = require("../middleware/validateLoan");

const { loansController } = require("../controllers");


router.get("/", auth, loansController.getAll);
router.post("/", auth, validateLoan, loansController.create);
router.get("/:id", loansController.get);
router.put("/:id", auth, validateLoan, loansController.update);
router.delete("/:id", auth, loansController.delete);

module.exports = router;