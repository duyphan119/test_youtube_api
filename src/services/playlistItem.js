const { service } = require("../config/configOAuth2Client");
const { oauth2Client } = require("../config/configOAuth2Client");

const getAll = async (refresh_token, access_token) => {
  try {
    oauth2Client.setCredentials({
      access_token: access_token,
      refresh_token: refresh_token,
    });
    const playLists = await service.playlists.list({
      part: ["id", "snippet", "status"],
      mine: true,
      auth: oauth2Client,
    });
    return {
      status: 200,
      data: playLists.data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
const create = async (access_token, refresh_token, item) => {
  try {
    oauth2Client.setCredentials({
      access_token: access_token,
      refresh_token: refresh_token,
    });
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
            videoId: item.videoId,
          },
        },
      },
    });
    return {
      status: 200,
      data: resPlayListItem,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
const getByVideoId = async (access_token, refresh_token, videoId) => {
  try {
    oauth2Client.setCredentials({
      access_token: access_token,
      refresh_token: refresh_token,
    });
    const resPlayListItem = await service.playlistItems.list({
      part: ["id", "snippet", "status", "contentDetails"],
      auth: oauth2Client,
      videoId: videoId,
      maxResults: 50,
    });
    return {
      status: 200,
      data: resPlayListItem,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
const getByPlayListId = async (access_token, refresh_token, playlistId) => {
  try {
    oauth2Client.setCredentials({
      access_token: access_token,
      refresh_token: refresh_token,
    });
    let resPlayListItem = await service.playlistItems.list({
      part: ["id", "snippet", "status", "contentDetails"],
      auth: oauth2Client,
      playlistId: playlistId,
      maxResults: 50,
    });
    return {
      status: 200,
      data: resPlayListItem,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
const deletePlayListItem = async (access_token, refresh_token, id) => {
  try {
    oauth2Client.setCredentials({
      access_token: access_token,
      refresh_token: refresh_token,
    });
    await service.playlistItems.delete({
      auth: oauth2Client,
      id: id,
    });
    return {
      status: 204,
      data: "Deleted",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};

module.exports = {
  getAll,
  create,
  getByPlayListId,
  getByVideoId,
  deletePlayListItem,
};
