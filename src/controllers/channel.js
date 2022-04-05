const { service } = require("../config/configOAuth2Client");
const channelService = require('../services/channel');



const channelController = {
   getById: async (req, res) => {
      const { channelId } = req.params;
      const response = await channelService.getById(channelId);
      const { status, data } = response;
      res.status(status).send(data)
   }
}
module.exports = channelController;