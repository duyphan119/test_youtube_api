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
      maxResults: 50,
    });
    console.log(playLists);
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

const getById = async (access_token, refresh_token, id) => {
  try {
    oauth2Client.setCredentials({
      access_token: access_token,
      refresh_token: refresh_token,
    });
    const playLists = await service.playlists.list({
      part: ["id", "snippet", "status"],
      auth: oauth2Client,
      id: id,
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

const _delete = async (access_token, refresh_token, id) => {
  try {
    oauth2Client.setCredentials({
      access_token: access_token,
      refresh_token: refresh_token,
    });
    await service.playlists.delete({
      id: id,
      auth: oauth2Client,
    });
    return {
      status: 200,
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
    // console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};

const update = async (access_token, refresh_token, playList) => {
  try {
    oauth2Client.setCredentials({
      access_token: access_token,
      refresh_token: refresh_token,
    });
    const resPlayList = await service.playlists.update({
      part: ["id", "snippet", "status", "player", "contentDetails"],
      auth: oauth2Client,
      requestBody: {
        ...playList,
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
  getById,
  update,
  _delete,
};
