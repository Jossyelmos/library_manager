const router = require("express").Router();
const auth = require("../middleware/auth");

const {membersController} = require("../controllers");


router.get("/", auth, membersController.getAll);
router.post("/", membersController.create);
router.get("/:id", auth, membersController.get);
router.put("/:id", auth, membersController.update);
router.delete("/:id", auth, membersController.delete);


module.exports = router;