import axios from "axios";
import * as constants from "../constants";
import { getAllSearchVideos } from "../redux/videoSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/video/search`;
export const apiSearch = async (dispatch, q) => {
  try {
    const res = await axios.get(`${API_URL}?q=${q}`);
    dispatch(getAllSearchVideos(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const apiSearchNext = async (dispatch, q, pageToken) => {
  try {
    const res = await axios.get(`${API_URL}?q=${q}&pageToken=${pageToken}`);
    dispatch(getAllSearchVideos({ ...res.data, next: true }));
  } catch (error) {
    console.log(error);
  }
};
