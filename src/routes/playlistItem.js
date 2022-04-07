const router = require('express').Router();
const playListItemController = require('../controllers/playListItem');
const { verifyToken } = require('../middlewares/auth');

router.get("/playlist/:playListId", verifyToken, playListItemController.getByPlayListId)
router.get("/video/:videoId", verifyToken, playListItemController.getByVideoId)
router.delete("/:id", verifyToken, playListItemController.deletePlayListItem)
router.post("/", verifyToken, playListItemController.create)

module.exports = router