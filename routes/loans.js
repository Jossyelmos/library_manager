const router = require("express").Router();
const auth = require("../middleware/auth");

const { loansController } = require("../controllers");


router.get("/", auth, loansController.getAll);
router.post("/", auth, loansController.create);
router.get("/:id", loansController.get);
router.put("/:id", auth, loansController.update);
router.delete("/:id", auth, loansController.delete);

module.exports = router;