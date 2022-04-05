const router = require('express').Router();
const videoCategoryController = require('../controllers/videoCategory');

router.get("/", videoCategoryController.getAll)

module.exports = router