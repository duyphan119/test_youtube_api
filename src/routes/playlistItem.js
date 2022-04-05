const router = require('express').Router();
const playListItemController = require('../controllers/playListItem');
const { verifyToken } = require('../middlewares/auth');

router.post("/", verifyToken, playListItemController.create)

module.exports = router