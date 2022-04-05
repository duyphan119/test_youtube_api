const playListItemService = require('../services/playListItem');
const playListItemController = {
   create: async (req, res) => {
      const response = await playListItemService.create(req.token, req.cookies.refresh_token, req.body);
   
      const { status, data } = response;
      res.status(status).send(data)
   }
}
module.exports = playListItemController;