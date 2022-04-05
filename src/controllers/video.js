const { service } = require("../config/configOAuth2Client");
const videoService = require('../services/video');
const videoController = {
   search: async (req, res) => {
      const { q } = req.query;
      const response = await videoService.searchVideos(q);
      const { status, data } = response;
      res.status(status).send(data)
   },
   getByVideoCategoryId: async (req, res) => {
      const { categoryId } = req.params
      const response = await videoService.getByVideoCategoryId(categoryId);
      const { status, data } = response;
      res.status(status).send(data)
   },
   getAll: async (req, res) => {
      try {

         const resService = await service.videos.list({
            "part": ["snippet", "contentDetails", "statistics"],
            "chart": "mostPopular",
            "videoCategoryId": 20,
            "regionCode": "VN"
         })

         res.status(200).send(resService.data)
      } catch (error) {
         console.log(error)
         return res.status(500).send(error)
      }
   },
   getById: async (req, res) => {
      const { videoId } = req.params
      const response = await videoService.getById(videoId);
      const { status, data } = response;
      res.status(status).send(data)
   }
}
module.exports = videoController;