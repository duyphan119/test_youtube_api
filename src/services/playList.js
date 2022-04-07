const { service } = require("../config/configOAuth2Client");
const { oauth2Client } = require("../config/configOAuth2Client");

const getAll = async (access_token, refresh_token) => {
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
const create = async (access_token, refresh_token, playList) => {
  try {
    oauth2Client.setCredentials({
      access_token: access_token,
      refresh_token: refresh_token,
    });
    const resPlayList = await service.playlists.insert({
      part: ["id", "snippet", "status"],
      mine: true,
      auth: oauth2Client,
      requestBody: {
        snippet: {
          title: playList.title,
        },
        status: {
          privacyStatus: playList.privacyStatus,
        },
      },
    });
    return {
      status: 200,
      data: resPlayList.data,
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
};
