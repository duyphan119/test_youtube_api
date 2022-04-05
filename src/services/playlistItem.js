const { service } = require("../config/configOAuth2Client");
const { oauth2Client } = require('../config/configOAuth2Client');

const getAll = async (refresh_token, access_token) => {
   try {
      oauth2Client.setCredentials({
         access_token: access_token,
         refresh_token: refresh_token
      })
      const playLists = await service.playlists.list({
         part: ["id", "snippet", "status"],
         mine: true,
         auth: oauth2Client
      })
      return {
         status: 200,
         data: playLists.data
      }
   } catch (error) {
      console.log(error)
      return {
         status: 500,
         data: error
      }
   }
}
const create = async (access_token, refresh_token, item) => {
   try {
      oauth2Client.setCredentials({
         access_token: access_token,
         refresh_token: refresh_token
      })
      console.log(item)
      const resPlayListItem = await service.playlistItems.insert({
         part: ["id", "snippet", "status"],
         mine: true,
         auth: oauth2Client,
         requestBody: {
            snippet: {
               playlistId: item.playlistId,
               resourceId: {
                  channelId: item.channelId,
                  playlistId: item.playlistId,
                  kind: item.kind,
                  videoId: item.videoId
               }
            },
         }
      })
      return {
         status: 200,
         data: resPlayListItem.data
      }
   } catch (error) {
      console.log(error)
      return {
         status: 500,
         data: error
      }
   }
}

module.exports = {
   getAll,
   create
}