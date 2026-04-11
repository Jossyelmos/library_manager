const router = require("express").Router();
const auth = require("../middleware/auth");
const validateMember = require("../middleware/validateMember");

const {membersController} = require("../controllers");


router.get("/", auth, membersController.getAll);
router.post("/", validateMember, membersController.create);
router.get("/:id", auth, membersController.get);
router.put("/:id", auth, validateMember, membersController.update);
router.delete("/:id", auth, membersController.delete);


module.exports = router;