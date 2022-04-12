import { configAxiosAuthorization } from "../config/configAxios";
import * as constants from "../constants";
import { getAllPlayLists, getCurrentPlayList } from "../redux/playlistSlice";
import { showToast } from "../redux/toastSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/playlist`;

export const apiGetAllPlayLists = async (user, dispatch) => {
  try {
    const res = await configAxiosAuthorization(user, dispatch).get(
      `${API_URL}`,
      {
        withCredentials: true,
      }
    );
    dispatch(getAllPlayLists(res));
  } catch (error) {
    console.log(error);
    const code = error.response.data.code;
    if (code === 401) {
      dispatch(
        showToast({
          type: "info",
          title: "Bạn cần đăng nhập để thực hiện thao tác",
          isVisible: true,
        })
      );
    }
    if (code === 404 && error.response.errors.reason === "channelNotFound") {
      dispatch(
        showToast({
          type: "info",
          title: "Bạn cần tạo kênh để thực hiện thao tác",
          isVisible: true,
        })
      );
    }
  }
};
export const apiGetPlayListById = async (user, id, dispatch) => {
  try {
    const data = await configAxiosAuthorization(user, dispatch).get(
      `${API_URL}/${id}`,
      {
        withCredentials: true,
      }
    );
    return data.items[0] ? data.items[0] : null;
    // dispatch(getAllPlayLists(res))
  } catch (error) {
    console.log(error);
    const code = error.response.data.code;
    if (code === 401) {
      dispatch(
        showToast({
          type: "info",
          title: "Bạn cần đăng nhập để thực hiện thao tác",
          isVisible: true,
        })
      );
    }
  }
};

export const apiCreatePlayList = async (user, playList, dispatch) => {
  try {
    const res = await configAxiosAuthorization(user, dispatch).post(
      `${API_URL}`,
      playList,
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    const code = error.response.data.code;
    if (code === 401) {
      dispatch(
        showToast({
          type: "info",
          title: "Bạn cần đăng nhập để thực hiện thao tác",
          isVisible: true,
        })
      );
    }
  }
};
export const apiDeletePlayList = async (user, id, dispatch) => {
  try {
    await configAxiosAuthorization(user, dispatch).delete(
      `${API_URL}/${id}`,
      {}
    );
    dispatch(getCurrentPlayList(null));
  } catch (error) {
    console.log(error);
  }
};

export const apiUpdatePlayList = async (user, playList, dispatch) => {
  try {
    const res = await configAxiosAuthorization(user, dispatch).put(
      `${API_URL}`,
      playList,
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    const code = error.response.data.code;
    if (code === 401) {
      dispatch(
        showToast({
          type: "info",
          title: "Bạn cần đăng nhập để thực hiện thao tác",
          isVisible: true,
        })
      );
    }
  }
};
