const playListItemService = require('../services/playListItem');
const playListItemController = {
   create: async (req, res) => {
      const response = await playListItemService.create(req.token, req.cookies.refresh_token, req.body);
   
      const { status, data } = response;
      res.status(status).send(data)
   },
   getByPlayListId: async (req, res) => {
      const response = await playListItemService.getByPlayListId(req.token, req.cookies.refresh_token, req.params.playListId);
   
      const { status, data } = response;
      res.status(status).send(data)
   },
   getByVideoId: async (req, res) => {
      const response = await playListItemService.getByVideoId(req.token, req.cookies.refresh_token, req.params.videoId);
   
      const { status, data } = response;
      res.status(status).send(data)
   },
   deletePlayListItem: async (req, res) => {
      const response = await playListItemService.deletePlayListItem(req.token, req.cookies.refresh_token, req.params.id);
   
      const { status, data } = response;
      res.status(status).send(data)
   },
}
module.exports = playListItemController;