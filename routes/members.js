const router = require("express").Router();
const auth = require("../middleware/auth");

const {membersController} = require("../controllers");


router.get("/", membersController.getAll);
router.post("/", membersController.create);
router.get("/:id", membersController.get);
router.put("/:id", auth, membersController.update);
router.delete("/:id", auth, membersController.delete);


module.exports = router;