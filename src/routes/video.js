const router = require('express').Router();
const videoController = require('../controllers/video');

router.get("/search", videoController.search);
router.get("/category-id/:categoryId", videoController.getByVideoCategoryId)
router.get("/:videoId", videoController.getById)
router.get("/", videoController.getAll)
module.exports = router