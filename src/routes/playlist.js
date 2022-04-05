const router = require('express').Router();
const playListController = require('../controllers/playList');
const { verifyToken } = require('../middlewares/auth');

router.get("/", verifyToken, playListController.getAll)
router.post("/", verifyToken, playListController.create)

module.exports = router