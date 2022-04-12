const router = require("express").Router();
const playListController = require("../controllers/playList");
const { verifyToken } = require("../middlewares/auth");

router.get("/:id", verifyToken, playListController.getById);
router.get("/", verifyToken, playListController.getAll);
router.post("/", verifyToken, playListController.create);
router.put("/", verifyToken, playListController.update);
router.delete("/:id", verifyToken, playListController._delete);

module.exports = router;
