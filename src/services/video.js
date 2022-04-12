const { service } = require("../config/configOAuth2Client");
const channelService = require("./channel");

const getById = async (id) => {
  try {
    const videos = await service.videos.list({
      part: ["statistics", "snippet", "topicDetails"],
      id: id,
    });
    return {
      status: 200,
      data: videos.data.items[0],
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};

const getStatisticsVideo = async (id) => {
  try {
    const channel = await service.videos.list({
      part: ["statistics"],
      chart: "mostPopular",
      id: id,
    });
    return {
      status: 200,
      data: channel.data.items[0].statistics,
    };
  } catch (error) {
    return {
      status: 500,
      data: error,
    };
  }
};

const searchVideos = async (q, pageToken) => {
  try {
    const option = {
      q: q,
      part: ["snippet"],
      maxResults: 5,
      channelType: "any",
      type: "video",
    };
    if (pageToken) {
      option.pageToken = pageToken;
    }
    const resService = await service.search.list(option);
    console.log(resService);
    const videos = resService.data;

    for (let i = 0; i < videos.items.length; i++) {
      const resChannelService = await channelService.getById(
        videos.items[i].snippet.channelId
      );
      const channels = resChannelService.data.items;
      const statistics = await getStatisticsVideo(videos.items[i].id.videoId);
      videos.items[i].snippet.channel = channels[0];
      videos.items[i].statistics = statistics.data;
    }

    return {
      status: 200,
      data: {
        ...videos,
        data: videos,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};

const getByVideoCategoryId = async (categoryId) => {
  try {
    const resService = await service.videos.list({
      part: ["snippet", "contentDetails", "statistics", "topicDetails"],
      chart: "mostPopular",
      videoCategoryId: categoryId,
      regionCode: "VN",
      maxResults: 4,
    });
    const videos = resService.data.items;
    for (let i = 0; i < videos.length; i++) {
      const resChannelService = await channelService.getById(
        videos[i].snippet.channelId
      );
      const channels = resChannelService.data.items;
      const statistics = await getStatisticsVideo(videos[i].id.videoId);
      videos[i].snippet.channel = channels[0];
      videos[i].statistics = statistics.data;
    }
    return {
      status: 200,
      data: videos,
    };
  } catch (error) {
    return {
      status: 500,
      data: [],
    };
  }
};

module.exports = {
  getStatisticsVideo,
  searchVideos,
  getByVideoCategoryId,
  getById,
};
