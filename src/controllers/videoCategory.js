const videoCategoryService = require('../services/videoCategory');
const videoCategoryController = {
   getAll: async (req, res) => {
      const response = await videoCategoryService.getAll();
      const { status, data } = response;
      res.status(status).send(data)
   }
}
module.exports = videoCategoryController;