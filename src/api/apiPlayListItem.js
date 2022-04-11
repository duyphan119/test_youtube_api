import { configAxiosAuthorization } from "../config/configAxios";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/playlistItem`;

export const apiCreatePlayListItem = async (user, playListItem, dispatch) => {
  try {
    const data = await configAxiosAuthorization(user, dispatch).post(
      `${API_URL}`,
      playListItem,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const apiGetPlayListItemByVideoId = async (user, videoId, dispatch) => {
  try {
    const data = await configAxiosAuthorization(user, dispatch).get(
      `${API_URL}/video/${videoId}`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
export const apiGetPlayListItemByPlayListId = async (
  user,
  playListId,
  dispatch
) => {
  try {
    const data = await configAxiosAuthorization(user, dispatch).get(
      `${API_URL}/playlist/${playListId}`,
      {
        withCredentials: true,
      }
    );
    return data.items;
  } catch (error) {
    console.log(error.response);
  }
};
export const apiDeletePlayListItem = async (user, id, dispatch) => {
  try {
    await configAxiosAuthorization(user, dispatch).delete(`${API_URL}/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error.response);
  }
};
