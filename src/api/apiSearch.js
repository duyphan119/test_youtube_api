import axios from "axios";
import * as constants from "../constants";
import { hideLoading, showLoading } from "../redux/loadingSlice";
import { getAllVideos } from "../redux/videoSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/video/search`;
export const apiSearch = async (dispatch, q) => {
  try {
    dispatch(showLoading());
    const res = await axios.get(`${API_URL}?q=${q}`);
    dispatch(getAllVideos(res.data));
    dispatch(hideLoading());
  } catch (error) {
    console.log(error);
    dispatch(hideLoading());
  }
};
