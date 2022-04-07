const { service } = require("../config/configOAuth2Client");
const videoService = require('./video');
const getAll = async () => {
   try {

      const resService = await service.videoCategories.list({
         "part": ["snippet"],
         "regionCode": "VN"
      })
      const videoCategories = resService.data.items;
      const newVideoCategories = []
      for (let i = 0; i < videoCategories.length; i++) {
         // const videos = await videoService.getByVideoCategoryId(videoCategories[i].id);
         // videoCategories[i].snippet.videos = videos.data
         // if (videos.data.length !== 0) {
         //    newVideoCategories.push(videoCategories[i])
         // }
         videoCategories[i].snippet.videos = []
         newVideoCategories.push(videoCategories[i])
      }

      return {
         status: 200,
         data: newVideoCategories
      }
   } catch (error) {
      return {
         status: 500,
         data: error
      }
   }
}

module.exports = {
   getAll
}